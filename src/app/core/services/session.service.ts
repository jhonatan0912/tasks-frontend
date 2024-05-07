import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { AUTH_TOKEN, REFRESH_TOKEN } from '@core/constants';
import { AuthResponseUserDto, SessionDto } from '@core/proxies';

type UserSessionType = AuthResponseUserDto | SessionDto;

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {

  private readonly _platformId = inject(PLATFORM_ID);

  user = signal<UserSessionType | undefined>(undefined);

  get token(): string | null {
    if (!isPlatformBrowser(this._platformId)) return null;

    return localStorage.getItem(AUTH_TOKEN);
  }

  get refreshToken(): string | null {
    if (!isPlatformBrowser(this._platformId)) return null;

    return localStorage.getItem(REFRESH_TOKEN);
  }

  setTokens(token: string, refreshToken: string): void {
    if (!isPlatformBrowser(this._platformId)) return;

    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  logout(): Promise<void> {
    if (!isPlatformBrowser(this._platformId)) return Promise.resolve();

    return new Promise<void>(resolve => {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      this.user.set(undefined);
      resolve();
    });
  }
}
