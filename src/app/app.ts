import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student { id: number; name: string; grade: string; className: string; present: boolean | null; }

@Component({ selector: 'app-root', imports: [CommonModule, FormsModule], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  protected readonly students = signal<Student[]>([
    { id: 1, name: 'Ana Souza', grade: '7º ano', className: 'Matemática - terça', present: null },
    { id: 2, name: 'Bruno Lima', grade: '8º ano', className: 'Matemática - terça', present: null },
    { id: 3, name: 'Carla Santos', grade: '7º ano', className: 'Português - quinta', present: null },
  ]);
  protected readonly activeSection = signal('inicio');
  protected readonly message = signal('');
  protected readonly search = signal('');
  protected readonly date = new Date().toISOString().slice(0, 10);
  protected filteredStudents(): Student[] { const term = this.search().toLowerCase(); return this.students().filter((s) => s.name.toLowerCase().includes(term)); }
  protected mark(student: Student, present: boolean): void { this.students.update((students) => students.map((item) => item.id === student.id ? { ...item, present } : item)); }
  protected saveAttendance(): void { this.message.set(this.students().some((s) => s.present === null) ? 'Marque presente ou ausente para todos os alunos.' : 'Presença registrada com sucesso.'); }
}
