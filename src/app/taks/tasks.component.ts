import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { TaskDto, TasksProxy } from '@core/proxies/tasks.proxie';
import { PaginatedMetaResponse, PaginatedResponse } from '@core/types';
import { TasksHeaderComponent } from './components/header/header.component';
import { TaskComponent } from './components/task/task.component';
import { isPlatformBrowser } from '@angular/common';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TasksHeaderComponent,
    TaskComponent,
    TaskFormComponent
  ],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {

  private readonly _platformId = inject(PLATFORM_ID);
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

  ngOnInit(): void {
    if (!isPlatformBrowser(this._platformId)) return;
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
