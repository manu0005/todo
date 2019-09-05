import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-integrated-voice',
  templateUrl: './integrated-voice.component.html',
  styleUrls: ['./integrated-voice.component.scss']
})
export class IntegratedVoiceComponent implements OnInit {
  @Input() text: string;
  isPlaying = false;

  constructor() { }

  ngOnInit() {
  }

  play() {
    if (this.text) {
      this.isPlaying = true;
      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(this.text);
        const synth = window.speechSynthesis;
        const voices = synth.getVoices().filter(v => v.lang === 'fr-FR')[0];
        synth.speak(u);
        this.isPlaying = false;
      }, 1000);
    }
  }
}
