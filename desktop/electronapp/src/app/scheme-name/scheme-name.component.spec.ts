import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeNameComponent } from './scheme-name.component';

describe('SchemeNameComponent', () => {
  let component: SchemeNameComponent;
  let fixture: ComponentFixture<SchemeNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
