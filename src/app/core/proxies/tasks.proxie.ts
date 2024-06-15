import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/services';
import { PaginatedResponse, Response } from '@core/types';
import { environment } from '@environments/environment';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksProxy {

  private readonly _http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/tasks`;
  }

  create(title: string, description: string): Observable<Response<TaskDto>> {
    const url = `${this.path}`;
    const body = {
      title,
      description
    };

    return this._http.post(url, body).pipe(mergeMap((response: any) => of(new Response<TaskDto>().fromJS(response))));
  }

  getAll(page: number = 1, limit: number = 20): Observable<PaginatedResponse<TaskDto>> {
    let url = `${this.path}`;

    if (page) url += `?page=${page}`;

    if (limit) url += `&limit=${limit}`;

    return this._http.get(url).pipe(mergeMap((response: any) => of(new PaginatedResponse<TaskDto>().fromJS(response))));
  }

  update(id: string, title: string, description: string, done: boolean): Observable<Response<TaskDto>> {
    const url = `${this.path}/${id}`;

    const body = {
      title,
      description,
      done
    };

    return this._http.update(url, body).pipe(mergeMap((response: any) => of(new Response<TaskDto>().fromJS(response))));
  }
}

export class TaskDto {
  id?: string;
  title!: string;
  description!: string;
  createdAt!: string;
  done!: boolean;

  init(data?: any): void {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.createdAt = data.createdAt;
      this.done = data.done;
    }
  }

  fromJS(data: any): TaskDto {
    return Object.assign(new TaskDto(), data);
  }
}