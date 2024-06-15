import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService, AppSessionService } from '@core/services';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(AppSessionService);
  const navigationService = inject(AppNavigationService);

  if (!sessionService.user()) {
    return true;
  }

  navigationService.forward('/tasks');
  return false;
};