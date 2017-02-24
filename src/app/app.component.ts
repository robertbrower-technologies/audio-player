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
  subscription1: Subscription;
  
  value: number;
  minValue: number = 0;
  maxValue: number = 1;
  minFreq: number = 440;
  maxFreq: number = 1000;
  duration: number;
  context: AudioContext;
  osc: OscillatorNode;
  playing: boolean;

  constructor(private statusService: StatusService) {
    this.statusService.statuses = [
      new Status(),
      new Status(),
      new Status()
    ];

    
    this.playing = true;
    this.context = new (window.AudioContext)();
    this.osc = this.context.createOscillator(); // instantiate an oscillator
    this.osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
    //this.osc.frequency.value = 1000 * this.value; // Hz
    this.osc.start(); // start the oscillator
  }

  ngOnInit() {
    this.testAudio.nativeElement.play();
    let timer1 = TimerObservable.create(0, 3000);
    this.subscription1 = timer1.subscribe(t => {
      this.createPlayList();
    });

    this.setValue(.5);
    this.playTone();
    //let timer2 = TimerObservable.create(0, 3000);
    //this.subscription2 = timer2.subscribe(t => {
    //  this.playTone();
    //});
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
  
  // http://stackoverflow.com/questions/6343450/generating-sound-on-the-fly-with-javascript-html5
  // http://stackoverflow.com/questions/32161832/web-audio-api-oscillator-node-error-cannot-call-start-more-than-once
  playTone() {
    if (this.playing) {
      this.osc.connect(this.context.destination); // connect it to the destination
      // var that = this;
      // setTimeout(function() {
      //   that.stopTone();
      // }, 1000);
      setTimeout(() => { this.stopTone(); }, this.duration)
    }
  }

  stopTone() {
    this.osc.disconnect(this.context.destination);
    if (this.playing) {
      setTimeout(() => { this.playTone(); }, this.duration)
    }
  }

  setValue(value: number) {
    //this.osc.frequency.value = 1000 * this.value;
    //scale = (range2.max - range2.min) / (range1.max - range1.min)
    //new_value = (value - range1.min) * scale + range2.min
    debugger;
    this.value = value;
    var scale = (this.maxFreq - this.minFreq) / (this.maxValue - this.minValue);
    this.osc.frequency.value = (this.value - this.minValue) * scale + this.minFreq;
    this.duration = 1050 - this.value * 1000;
  }

  togglePlaying() {
    this.playing = !this.playing;
    if (this.playing) {
      this.playTone();
    } else {
      this.stopTone();
    }
  }
  
}
