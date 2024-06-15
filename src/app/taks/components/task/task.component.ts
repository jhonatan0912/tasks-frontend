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
    event.preventDefault();
    event.stopPropagation();

    this.edit.set(false);
  }

  @HostListener('click')
  onClick(): void {
    this.edit.set(true);
    console.log(this.form());
    setTimeout(() => {
      this.form()!.status = 'visible';
      const { done, createdAt, ...rest } = this.task();
      this.form()!.task = rest;
    }, 100);
  }
}
