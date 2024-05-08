import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppNavigationService, AppSessionService } from '@core/services';

export const tasksGuard: CanActivateFn = (): boolean => {
  const sessionService = inject(AppSessionService);
  const navigation = inject(AppNavigationService);

  if (sessionService.token || sessionService.user()) {
    return true;
  }

  navigation.forward('/auth/login');
  return false;
};