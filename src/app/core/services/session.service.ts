import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { AUTH_TOKEN, REFRESH_TOKEN } from '@core/constants';
import { AuthResponseUserDto, SessionDto } from '@core/proxies';
import { CookieService } from 'ngx-cookie';

type UserSessionType = AuthResponseUserDto | SessionDto;

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {

  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _cookieService = inject(CookieService);

  user = signal<UserSessionType | undefined>(undefined);

  get token(): string | undefined {
    if (!isPlatformBrowser(this._platformId)) return undefined;

    return this._cookieService.get(AUTH_TOKEN);
  }

  get refreshToken(): string | undefined {
    if (!isPlatformBrowser(this._platformId)) return undefined;

    return this._cookieService.get(REFRESH_TOKEN);
  }

  clearUser(): void {
    this.user.set(undefined);
  }
}
