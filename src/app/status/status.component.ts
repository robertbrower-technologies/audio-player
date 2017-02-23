import { Component, OnInit, Input } from '@angular/core';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input('index') index;

  status: Status;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.status = this.statusService.statuses[this.index];
  }

  toggle() {
    this.status.muted = !this.status.muted;
  }
}
