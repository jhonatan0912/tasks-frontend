import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/inheritance';

@Component({
  selector: 'tasks-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class TasksHeaderComponent extends ViewComponent {

  get profileIcon(): string {
    if (!this.session.user()) return '';

    return this.session.user()!.fullName[0].toUpperCase();
  }

  onLogout(): void {
    this.session.logout()
      .then(() => {
        this.navigation.forward('/auth/login');
      });
  }
}
