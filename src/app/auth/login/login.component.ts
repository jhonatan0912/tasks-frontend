import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewComponent } from '@core/inheritance';
import { AuthProxy } from '@core/proxies';
import { LanguageService } from '@core/services';
import { StrongPasswordRegx } from "@core/utils";
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/button/button.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    ButtonComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);

  languageService = inject(LanguageService);

  busy = signal(false);
  fields = new FormGroup({
    email: new FormControl('jhonatan@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('Jhonatan123@.', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
  });

  onLogin(): void {
    if (this.fields.valid) {
      const { email, password } = this.fields.value;
      if (!email || !password) return;

      this.busy.set(true);
      this._authProxy.login(
        email,
        password
      ).pipe(
        finalize(() => this.busy.set(false))
      ).subscribe({
        next: (response) => {
          this.session.user.set(response.data.user);
          this.navigation.forward('/tasks');
        },
        error: (err) => {
          this.toast.error(err.message);
        }
      });
    } else {
      this.fields.markAllAsTouched();
      this.fields.markAsDirty();
    }
  }

  onRegister(): void {
    this.navigation.forward('/auth/register');
  }
}
