import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/services';
import { Response } from '@core/types';
import { environment } from '@environments/environment';
import { Observable, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthProxy {

  private readonly _http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/auth`;
  }

  register(fullName: string, email: string, password: string): Observable<Response<AuthResponseDto>> {
    const url = `${this.path}/register`;
    const body = {
      fullName,
      email,
      password
    };

    return this._http.post(url, body).pipe(
      mergeMap((response: any) => of(new Response().fromJS<AuthResponseDto>(response)))
    );
  }

  login(email: string, password: string): Observable<Response<AuthResponseDto>> {
    const url = `${this.path}/login`;
    const body = {
      email,
      password
    };

    return this._http.post(url, body).pipe(
      mergeMap((response: any) => of(new Response().fromJS<AuthResponseDto>(response)))
    );
  }

  getSession(): Observable<Response<SessionDto>> {
    const url = `${this.path}/session`;

    return this._http.get(url).pipe(
      mergeMap((response: any) => of(new Response().fromJS<SessionDto>(response)))
    );
  }

  refreshToken(token: string): Observable<Response<RefreskTokenDto>> {
    const url = `${this.path}/refresh-token`;
    const body = {
      token
    };

    return this._http.post(url, body).pipe(
      mergeMap((response: any) => of(new Response().fromJS<RefreskTokenDto>(response)))
    );
  }
}

export class AuthResponseDto {
  user!: AuthResponseUserDto;
  token!: string;
  refreshToken!: string;

  init(data?: any): void {
    if (data) {
      this.user = data.user;
      this.token = data.token;
      this.refreshToken = data.refreshToken;
    }
  }

  fromJS(data: any): AuthResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new AuthResponseDto();
    result.init(data);
    return result;
  }
}

export class AuthResponseUserDto {
  id!: string;
  fullName!: string;
  email!: string;

  init(data?: any): void {
    if (data) {
      this.id = data.id;
      this.fullName = data.fullName;
      this.email = data.email;
    }
  }

  fromJS(data: any): AuthResponseUserDto {
    data = typeof data === 'object' ? data : {};
    const result = new AuthResponseUserDto();
    result.init(data);
    return result;
  }
}

export class SessionDto {
  id!: string;
  email!: string;
  fullName!: string;

  init(data?: any): void {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.fullName = data.fullName;
    }
  }

  fromJS(data: any): SessionDto {
    data = typeof data === 'object' ? data : {};
    const result = new SessionDto();
    result.init(data);
    return result;
  }
}

export class RefreskTokenDto {
  token!: string;
  refreshToken!: string;

  init(data?: any): void {
    if (data) {
      this.token = data.token;
      this.refreshToken = data.refreshToken;
    }
  }

  fromJS(data: any): RefreskTokenDto {
    data = typeof data === 'object' ? data : {};
    const result = new RefreskTokenDto();
    result.init(data);
    return result;
  }
}