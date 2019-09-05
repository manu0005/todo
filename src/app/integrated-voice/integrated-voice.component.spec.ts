import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedVoiceComponent } from './integrated-voice.component';

describe('IntegratedVoiceComponent', () => {
  let component: IntegratedVoiceComponent;
  let fixture: ComponentFixture<IntegratedVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratedVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratedVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
