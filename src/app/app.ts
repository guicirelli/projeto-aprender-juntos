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
  protected readonly students = signal<Student[]>([
    { id: 4, name: 'Lucas Ferreira', age: 12, grade: '7º ano', classId: 1, guardian: 'Responsável fictício', active: true },
    { id: 1, name: 'Ana Souza', age: 12, grade: '7º ano', classId: 1, guardian: 'Responsável fictício', active: true },
    { id: 2, name: 'Bruno Lima', age: 13, grade: '8º ano', classId: 1, guardian: 'Responsável fictício', active: true },
    { id: 3, name: 'Carla Santos', age: 12, grade: '7º ano', classId: 2, guardian: 'Responsável fictício', active: true },
  ]);
  protected readonly classes = signal<ClassGroup[]>([
    { id: 1, name: 'Reforço de Matemática', subject: 'Matemática', day: 'Terça-feira', time: '14h às 15h', volunteer: 'João (fictício)', capacity: 10 },
    { id: 2, name: 'Português - quinta', subject: 'Língua Portuguesa', day: 'Quinta-feira', time: '14h às 15h', volunteer: 'Maria (fictícia)', capacity: 10 },
  ]);
  protected readonly attendance = signal<Attendance[]>([]);
  protected readonly selectedClassId = signal(1);
  protected readonly selectedDate = signal('2026-08-14');
  protected readonly form = { name: '', age: null as number | null, grade: '', guardian: '', classId: 1 };
  protected readonly attendanceDraft = signal<Record<number, boolean | null>>({ 4: true, 1: true, 2: false });

  protected filteredStudents(): Student[] { const term = this.search().toLowerCase(); return this.students().filter((s) => s.name.toLowerCase().includes(term)); }
  protected className(id: number): string { return this.classes().find((c) => c.id === id)?.name ?? 'Sem turma'; }
  protected studentsInSelectedClass(): Student[] { return this.students().filter((s) => s.classId === this.selectedClassId()); }
  protected setSection(section: 'inicio'|'alunos'|'turmas'|'presenca'|'historico'): void { this.message.set(''); this.activeSection.set(section); }
  protected addStudent(): void {
    if (!this.form.name.trim() || !this.form.age || !this.form.grade.trim() || !this.form.guardian.trim()) { this.message.set('Preencha todos os campos obrigatórios do aluno.'); return; }
    const student: Student = { id: Date.now(), name: this.form.name.trim(), age: this.form.age, grade: this.form.grade.trim(), guardian: this.form.guardian.trim(), classId: this.form.classId, active: true };
    this.students.update((items) => [...items, student]); Object.assign(this.form, { name: '', age: null, grade: '', guardian: '' }); this.message.set('Aluno cadastrado com sucesso.');
  }
  protected setAttendance(studentId: number, present: boolean): void { this.attendanceDraft.update((draft) => ({ ...draft, [studentId]: present })); }
  protected saveAttendance(): void {
    const group = this.studentsInSelectedClass(); const draft = this.attendanceDraft();
    if (!this.selectedDate() || group.some((s) => draft[s.id] === null || draft[s.id] === undefined)) { this.message.set('Marque presente ou ausente para todos os alunos.'); return; }
    const date = this.selectedDate(); const classId = this.selectedClassId(); const kept = this.attendance().filter((a) => !(a.classId === classId && a.date === date));
    const newRows = group.map((s) => ({ id: Date.now() + s.id, studentId: s.id, classId, date, present: draft[s.id] === true, note: '' }));
    this.attendance.set([...kept, ...newRows]); this.message.set('Presença registrada com sucesso.');
  }
  protected recordsForStudent(studentId: number): Attendance[] { return this.attendance().filter((a) => a.studentId === studentId).sort((a, b) => b.date.localeCompare(a.date)); }
  protected presentCount(): number { return this.attendance().filter((a) => a.present).length; }
}
