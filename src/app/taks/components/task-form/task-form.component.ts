import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskDto, TasksProxy } from '@core/proxies/tasks.proxie';

type FormState = 'hidden' | 'visible';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {

  private readonly _tasksProxy = inject(TasksProxy);

  onTask = output<TaskDto>();

  status: FormState = 'hidden';
  task = {
    title: '',
    description: ''
  };

  onToggleStatus(): void {
    this.status === 'hidden'
      ? this.status = 'visible'
      : this.status = 'hidden';
  }

  onSubmit(): void {
    const { title, description } = this.task;

    this._tasksProxy.create(
      title,
      description
    ).subscribe({
      next: (response) => {
        this.onTask.emit(response.data);
        this.onResetFields();
        this.onToggleStatus();
      }
    });
  }

  onCancel(): void {
    this.onToggleStatus();
  }

  onResetFields(): void {
    this.task = {
      title: '',
      description: ''
    };
  }
}
