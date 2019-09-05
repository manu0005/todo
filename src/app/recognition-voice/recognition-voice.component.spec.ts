import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionVoiceComponent } from './recognition-voice.component';

describe('RecognitionVoiceComponent', () => {
  let component: RecognitionVoiceComponent;
  let fixture: ComponentFixture<RecognitionVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognitionVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognitionVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
