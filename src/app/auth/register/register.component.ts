import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewComponent } from '@core/inheritance';
import { AuthProxy } from '@core/proxies';
import { StrongPasswordRegx } from '@core/utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);

  fields = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (!this.arePasswordsEqual()) return;
    if (!this.fields.valid) return;

    const { fullName, email, password } = this.fields.value;
    if (!fullName || !email || !password) return;

    this._authProxy.register(
      fullName,
      email,
      password
    ).subscribe({
      next: (response) => {
        this.session.user.set(response.data.user);
        this.navigation.forward('/tasks');
      }
    });
  }

  arePasswordsEqual(): boolean {
    return this.fields.value.password === this.fields.value.confirmPassword;
  }

  onLogin(): void {
    this.navigation.forward('/auth/login');
  }
}
