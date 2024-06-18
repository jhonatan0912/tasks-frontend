import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'header-user',
  standalone: true,
  templateUrl: './header-user.component.html'
})
export class HeaderUserComponent {

  profileIcon = input();
  busy = model<boolean>();
  onLogout = output<void>();
}