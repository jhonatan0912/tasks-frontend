import { DatePipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { TaskDto } from '@core/proxies/tasks.proxie';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    TranslateModule
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

  task = input.required<TaskDto>();

  constructor() { }

  ngOnInit() {
  }

}
