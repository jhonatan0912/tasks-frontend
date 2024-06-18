import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'switch',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './switch.component.html',
  styleUrls: ['switch.component.scss']
})
export class SwitchComponent {

  checked = model<boolean>();
}
