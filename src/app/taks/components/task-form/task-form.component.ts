import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskDto, TasksProxy } from '@core/proxies/tasks.proxie';

type FormState = 'hidden' | 'visible';
interface TaskForm {
  id?: string | undefined;
  title: string;
  description: string;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {

  private readonly _tasksProxy = inject(TasksProxy);

  onTask = output<TaskDto>();
  onCancel = output<Event>();

  status: FormState = 'hidden';
  task: TaskForm = {
    id: '',
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

  handleCancel(event: Event): void {
    this.onToggleStatus();
    this.onCancel.emit(event);
  }

  onResetFields(): void {
    this.task = {
      id: '',
      title: '',
      description: ''
    };
  }
}
