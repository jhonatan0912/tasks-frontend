import { inject } from '@angular/core';
import { AppNavigationService, AppSessionService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

export abstract class ViewComponent {

  navigation = inject(AppNavigationService);
  session = inject(AppSessionService);
  toast = inject(ToastrService);

}