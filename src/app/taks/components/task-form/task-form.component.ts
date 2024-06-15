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
  onDone = output<boolean>();

  status: FormState = 'hidden';
  task: Partial<TaskDto> = {
    id: '',
    title: '',
    description: ''
  };

  onToggleStatus(): void {
    this.status === 'hidden'
      ? this.status = 'visible'
      : this.status = 'hidden';
  }

  onSubmit(event: Event): void {
    event.stopPropagation();

    const { title, description } = this.task;

    if (this.task.id) {
      this.onUpdate(event, this.task.id, title!, description!, !this.task.done!);
    } else {
      this.onCreate(title!, description!);
    }
  }

  onCreate(title: string, description: string): void {
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

  onUpdate(event: Event, id: string, title: string, description: string, done: boolean): void {
    this._tasksProxy.update(
      id,
      title,
      description,
      done
    ).subscribe({
      next: (response) => {
        this.task = response.data;
        this.onToggleStatus();
        this.onCancel.emit(event);
        this.onDone.emit(response.data.done);
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
