import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  private readonly _http = inject(HttpClient);

  get(url: string): Observable<any> {
    return this._http.get(url);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this._http.post(url, body, options);
  }

  update(url: string, body: any): Observable<any> {
    return this._http.patch(url, body);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(url);
  }

}