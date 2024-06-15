import { isPlatformBrowser } from '@angular/common';
import { Injector, PLATFORM_ID } from '@angular/core';
import { AuthProxy } from '@core/proxies';
import { AppSessionService, LanguageService } from '@core/services';

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
    });
};

export const appInitializer = (injector: Injector) => {
  const sessionService = injector.get(AppSessionService);
  const languageService = injector.get(LanguageService);

  return () => {
    return new Promise<void>((resolve) => {
      languageService.init();
      getSession(injector);
      resolve();
    });
  };
};