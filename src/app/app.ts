import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './components/counter/counter';
import { TaskList } from './components/task-list/task-list';

@Component({
  imports: [RouterOutlet, Counter, TaskList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Práctica 4 CI/CD');
}
