import { inject } from '@angular/core';
import { AppNavigationService, AppSessionService } from '@core/services';

export abstract class ViewComponent {

  navigation = inject(AppNavigationService);
  session = inject(AppSessionService);

}