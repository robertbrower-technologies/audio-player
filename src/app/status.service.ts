import { Injectable } from '@angular/core';
import { Status } from './status';
@Injectable()
export class StatusService {

  public statuses: Status[];

  constructor() {
    this.statuses = [];
  }
  
}
