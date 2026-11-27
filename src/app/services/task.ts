import { Service, signal, computed } from '@angular/core';

export interface TaskItem {
  id: number;
  title: string;
  done: boolean;
}

@Service()
export class Task {
  private nextId = 1;
  private readonly items = signal<TaskItem[]>([]);

  readonly tasks = this.items.asReadonly();
  readonly pendingCount = computed(() => this.items().filter((t) => !t.done).length);

  add(title: string): TaskItem | null {
    const clean = title.trim();
    if (!clean) {
      return null;
    }
    const task: TaskItem = { id: this.nextId++, title: clean, done: false };
    this.items.update((list) => [...list, task]);
    return task;
  }

  toggle(id: number): void {
    this.items.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((t) => t.id !== id));
  }

  // Métodos nuevos SIN tests: bajan la cobertura por debajo del umbral.
  rename(id: number, title: string): void {
    const clean = title.trim();
    if (!clean) {
      return;
    }
    this.items.update((list) => list.map((t) => (t.id === id ? { ...t, title: clean } : t)));
  }

  markAllDone(): void {
    this.items.update((list) => list.map((t) => ({ ...t, done: true })));
  }

  clearDone(): void {
    this.items.update((list) => list.filter((t) => !t.done));
  }

  search(text: string): TaskItem[] {
    const q = text.trim().toLowerCase();
    return this.items().filter((t) => t.title.toLowerCase().includes(q));
  }

  toCsv(): string {
    const rows = this.items().map((t) => `${t.id};${t.title};${t.done ? 'sí' : 'no'}`);
    return ['id;título;hecha', ...rows].join('\n');
  }
}
