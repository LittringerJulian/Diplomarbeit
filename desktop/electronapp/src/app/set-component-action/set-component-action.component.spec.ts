import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetComponentActionComponent } from './set-component-action.component';

describe('SetComponentActionComponent', () => {
  let component: SetComponentActionComponent;
  let fixture: ComponentFixture<SetComponentActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetComponentActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetComponentActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
