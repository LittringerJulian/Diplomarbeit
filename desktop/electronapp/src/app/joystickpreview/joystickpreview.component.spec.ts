import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoystickpreviewComponent } from './joystickpreview.component';

describe('JoystickpreviewComponent', () => {
  let component: JoystickpreviewComponent;
  let fixture: ComponentFixture<JoystickpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoystickpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoystickpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
