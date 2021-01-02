import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonpreviewComponent } from './buttonpreview.component';

describe('ButtonpreviewComponent', () => {
  let component: ButtonpreviewComponent;
  let fixture: ComponentFixture<ButtonpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
