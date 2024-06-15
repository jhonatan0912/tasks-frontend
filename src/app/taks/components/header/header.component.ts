import { Component, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/inheritance';
import { AuthProxy } from '@core/proxies';
import { LanguageService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'tasks-header',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './header.component.html',
})
export class TasksHeaderComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);

  languageService = inject(LanguageService);

  busy = signal(false);

  get profileIcon(): string {
    if (!this.session.user()) return '';

    return this.session.user()!.fullName[0].toUpperCase();
  }

  onLogout(): void {
    this.busy.set(true);

    this._authProxy.logout()
      .pipe(finalize(()=>this.busy.set(false)))
      .subscribe({
        next: () => {
          this.session.clearUser();
          this.navigation.forward('/auth/login');
        }
      });
  }
}
