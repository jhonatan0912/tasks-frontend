import { DatePipe } from '@angular/common';
import { Component, ElementRef, HostListener, input, signal, viewChild } from '@angular/core';
import { TaskDto } from '@core/proxies/tasks.proxie';
import { TranslateModule } from '@ngx-translate/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    TranslateModule,
    TaskFormComponent
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent {

  form = viewChild<TaskFormComponent>('form');

  task = input.required<TaskDto>();
  edit = signal(false);

  onCancel(event: Event): void {
    event.stopPropagation();

    this.edit.set(false);
  }

  onDone(done: boolean): void {
    this.task().done = done;
  }

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    if (this.edit()) return;
    e.preventDefault();
    e.stopPropagation();

    this.edit.set(true);
    setTimeout(() => {
      this.form()!.status = 'visible';
      const { createdAt, ...rest } = this.task();
      this.form()!.task = rest;
    }, 100);
  }
}
