import { Component, ViewChild, OnInit } from '@angular/core';
import { Status } from './status';
import { StatusService } from './status.service';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StatusService]
})
export class AppComponent implements OnInit {

  @ViewChild('myAudio') testAudio;
  @ViewChild('a') _a;
  @ViewChild('b') _b;
  @ViewChild('c') _c;
  @ViewChild('d') _d;
  @ViewChild('e') _e;
  @ViewChild('f') _f;
  playList: any[];
  currentTrack: number;

  subscription: any;

  constructor(private statusService: StatusService) {
    this.statusService.statuses = [
      new Status(),
      new Status(),
      new Status()
    ];
  }

  ngOnInit() {
    this.testAudio.nativeElement.play();
    let timer = TimerObservable.create(0, 3000);
    this.subscription = timer.subscribe(t => {
      this.createPlayList();
    });
  }

  public setStatus(index: number, message: string, cssClass: string, audio: any) {
    this.statusService.statuses[index].message = message;
    this.statusService.statuses[index].cssClass = cssClass;
    this.statusService.statuses[index].audio = audio;
  }

  createPlayList() {
    this.playList = this.statusService.statuses.filter(status => {
      return status.audio && !status.muted;
    });

    if (this.playList && this.playList.length > 0) {
      this.currentTrack = 0;
      this.play(this.playList[this.currentTrack]);
    }
  }

  play(status: any) {
    status.audio.nativeElement.play();
  }

  playNext() {
    this.currentTrack = this.currentTrack + 1;
    if (this.currentTrack < this.playList.length) {
      this.play(this.playList[this.currentTrack]);
    }
  }
}
