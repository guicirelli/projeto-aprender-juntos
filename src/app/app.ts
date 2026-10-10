import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student { id: number; name: string; age: number; grade: string; classId: number; guardian: string; active: boolean; }
interface ClassGroup { id: number; name: string; subject: string; day: string; time: string; volunteer: string; capacity: number; }
interface Attendance { id: number; studentId: number; classId: number; date: string; present: boolean; note: string; }

@Component({ selector: 'app-root', imports: [CommonModule, FormsModule], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  protected readonly activeSection = signal<'inicio'|'alunos'|'turmas'|'presenca'|'historico'>('inicio');
  protected readonly message = signal('');
  protected readonly search = signal('');
  protected readonly students = signal<Student[]>([]);
  protected readonly classes = signal<ClassGroup[]>([]);
  protected readonly attendance = signal<Attendance[]>([]);
  protected readonly lastSaved = signal<Attendance | null>(null);
  protected readonly selectedClassId = signal(0);
  protected readonly selectedDate = signal('2026-08-14');
  protected readonly form = { name: '', age: null as number | null, grade: '', guardian: '', classId: 0 };
  protected readonly classForm = { name: '', subject: '', day: '', time: '', volunteer: '', capacity: 10 };
  protected readonly attendanceDraft = signal<Record<number, boolean | null>>({});

  constructor() { this.loadData(); }

  private loadData(): void {
    if (typeof localStorage === 'undefined') return;
    const data = localStorage.getItem('aprender-juntos-data');
    if (!data) return;
    try { const parsed = JSON.parse(data); this.students.set(parsed.students ?? []); this.classes.set(parsed.classes ?? []); this.attendance.set(parsed.attendance ?? []); this.selectedClassId.set(parsed.classes?.[0]?.id ?? 0); } catch { this.message.set('Não foi possível carregar os dados salvos.'); }
  }

  private saveData(): void { if (typeof localStorage !== 'undefined') localStorage.setItem('aprender-juntos-data', JSON.stringify({ students: this.students(), classes: this.classes(), attendance: this.attendance() })); }

  protected filteredStudents(): Student[] { const term = this.search().toLowerCase(); return this.students().filter((s) => s.name.toLowerCase().includes(term)); }
  protected className(id: number): string { return this.classes().find((c) => c.id === id)?.name ?? 'Sem turma'; }
  protected studentName(id: number): string { return this.students().find((s) => s.id === id)?.name ?? 'Aluno removido'; }
  protected recordsForClass(classId: number): Attendance[] { return this.attendance().filter((a) => a.classId === classId).sort((a, b) => b.date.localeCompare(a.date)); }
  protected studentsInSelectedClass(): Student[] { return this.students().filter((s) => s.classId === this.selectedClassId()); }
  protected setSection(section: 'inicio'|'alunos'|'turmas'|'presenca'|'historico'): void { this.message.set(''); this.activeSection.set(section); }
  protected addStudent(): void {
    if (!this.form.name.trim() || !this.form.age || !this.form.grade.trim() || !this.form.guardian.trim()) { this.message.set('Preencha todos os campos obrigatórios do aluno.'); return; }
    const student: Student = { id: Date.now(), name: this.form.name.trim(), age: this.form.age, grade: this.form.grade.trim(), guardian: this.form.guardian.trim(), classId: this.form.classId, active: true };
    this.students.update((items) => [...items, student]); Object.assign(this.form, { name: '', age: null, grade: '', guardian: '' }); this.saveData(); this.message.set('Aluno cadastrado com sucesso.');
  }
  protected removeStudent(student: Student): void { this.students.update((items) => items.filter((item) => item.id !== student.id)); this.attendance.update((items) => items.filter((item) => item.studentId !== student.id)); this.saveData(); this.message.set('Aluno removido.'); }
  protected addClass(): void { if (!this.classForm.name.trim() || !this.classForm.subject.trim() || !this.classForm.day.trim() || !this.classForm.time.trim()) { this.message.set('Preencha nome, matéria, dia e horário da turma.'); return; } const group: ClassGroup = { id: Date.now(), ...this.classForm, name: this.classForm.name.trim(), subject: this.classForm.subject.trim(), day: this.classForm.day.trim(), time: this.classForm.time.trim(), volunteer: this.classForm.volunteer.trim() || 'Não informado' }; this.classes.update((items) => [...items, group]); if (!this.selectedClassId()) this.selectedClassId.set(group.id); Object.assign(this.classForm, { name: '', subject: '', day: '', time: '', volunteer: '', capacity: 10 }); this.saveData(); this.message.set('Turma cadastrada com sucesso.'); }
  protected removeClass(group: ClassGroup): void { this.classes.update((items) => items.filter((item) => item.id !== group.id)); this.students.update((items) => items.map((item) => item.classId === group.id ? { ...item, classId: 0 } : item)); this.attendance.update((items) => items.filter((item) => item.classId !== group.id)); this.selectedClassId.set(this.classes()[0]?.id ?? 0); this.saveData(); this.message.set('Turma removida.'); }
  protected setAttendance(studentId: number, present: boolean): void { this.attendanceDraft.update((draft) => ({ ...draft, [studentId]: present })); }
  protected saveAttendance(): void {
    const group = this.studentsInSelectedClass(); const draft = this.attendanceDraft();
    if (!this.selectedClassId() || !group.length) { this.message.set('Cadastre uma turma e alunos antes de registrar presença.'); return; }
    if (!this.selectedDate() || group.some((s) => draft[s.id] === null || draft[s.id] === undefined)) { this.message.set('Marque presente ou ausente para todos os alunos.'); return; }
    const date = this.selectedDate(); const classId = this.selectedClassId(); const kept = this.attendance().filter((a) => !(a.classId === classId && a.date === date));
    const newRows = group.map((s) => ({ id: Date.now() + s.id, studentId: s.id, classId, date, present: draft[s.id] === true, note: '' }));
    this.attendance.set([...kept, ...newRows]); this.lastSaved.set(newRows[0] ?? null); this.saveData(); this.message.set('Presença registrada com sucesso.'); this.setSection('historico');
  }
  protected recordsForStudent(studentId: number): Attendance[] { return this.attendance().filter((a) => a.studentId === studentId).sort((a, b) => b.date.localeCompare(a.date)); }
  protected presentCount(): number { return this.attendance().filter((a) => a.present).length; }
}
