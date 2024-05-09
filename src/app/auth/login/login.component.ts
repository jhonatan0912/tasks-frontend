import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewComponent } from '@core/inheritance';
import { AuthProxy } from '@core/proxies';
import { StrongPasswordRegx } from "@core/utils";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);

  fields = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
  });

  get passwordField() {
    return this.fields.get<string>('password');
  }

  onLogin(): void {
    if (this.fields.valid) {
      const { email, password } = this.fields.value;
      if (!email || !password) return;

      this._authProxy.login(
        email,
        password
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.session.user.set(response.data.user);
          this.session.setTokens(response.data.token, response.data.refreshToken);
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
