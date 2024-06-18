import { Component, inject } from '@angular/core';
import { TaskDto, TasksProxy } from '@core/proxies/tasks.proxie';
import { PaginatedMetaResponse, PaginatedResponse } from '@core/types';
import { TasksHeaderComponent } from './components/header/header.component';
import { SwitchComponent } from './components/switch/switch.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TasksHeaderComponent,
    TaskComponent,
    TaskFormComponent,
    SwitchComponent
  ],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {

  private readonly _tasksProxy = inject(TasksProxy);

  tasksReponse = new PaginatedResponse<TaskDto>({
    data: [],
    meta: new PaginatedMetaResponse({
      page: 0,
      limit: 0,
      total: 0,
      lastPage: 0,
    })
  });

  constructor() {
    this.onGetTasks();
  }

  onGetTasks(): void {
    this._tasksProxy.getAll()
      .subscribe({
        next: (response) => {
          this.tasksReponse = response;
        }
      });
  }

  onTask(task: TaskDto): void {
    this.tasksReponse.data.unshift(task);
  }
}
