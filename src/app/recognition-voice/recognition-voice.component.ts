import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-recognition-voice',
  templateUrl: './recognition-voice.component.html',
  styleUrls: ['./recognition-voice.component.scss']
})
export class RecognitionVoiceComponent implements OnInit {
  @Output() event = new EventEmitter<string>();
  eventText = new BehaviorSubject<string>('');
  text: string;
  isReco = false;

  constructor(private cr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  recognice() {
    /*this.isReco = true;
    this.cr.detectChanges();
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      this.isReco = false;
      const text = event.results[0][0].transcript;
      console.log(text);
      this.text = text;
      this.eventText.next(this.text);
      this.event.emit(text);
      this.cr.detectChanges();
      recognition.stop();
    };*/
  }
}
