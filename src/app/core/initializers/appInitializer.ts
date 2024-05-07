import { isPlatformBrowser } from '@angular/common';
import { Injector, PLATFORM_ID } from '@angular/core';
import { AuthProxy } from '@core/proxies';
import { AppSessionService } from '@core/services';

const getSession = (injector: Injector): void => {
  const authProxy = injector.get(AuthProxy);
  const platformId = injector.get(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return;

  authProxy.getSession()
    .subscribe({
      next: (response) => {
        const sessionService = injector.get(AppSessionService);
        sessionService.user.set(response.data);
      },
      error: () => {
        tryWithRefreskToken(injector);
      }
    });
};

const tryWithRefreskToken = (injector: Injector): void => {
  const sessionService = injector.get(AppSessionService);
  const authProxy = injector.get(AuthProxy);
  const refreshToken = sessionService.refreshToken;

  if (!refreshToken) return;

  authProxy.refreshToken(refreshToken)
    .subscribe({
      next: (response) => {
        sessionService.setTokens(response.data.token, response.data.refreshToken);
        getSession(injector);
      },
      error: () => {
        sessionService.logout();
      }
    });
};

export const appInitializer = (injector: Injector) => {
  const sessionService = injector.get(AppSessionService);

  return () => {
    return new Promise<void>((resolve) => {
      const token = sessionService.token;
      const refreshToken = sessionService.refreshToken;

      if (!token || !refreshToken) return resolve();

      getSession(injector);
      resolve();
    });
  };
};