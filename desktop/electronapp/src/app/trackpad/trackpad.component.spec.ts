import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackpadComponent } from './trackpad.component';

describe('TrackpadComponent', () => {
  let component: TrackpadComponent;
  let fixture: ComponentFixture<TrackpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
