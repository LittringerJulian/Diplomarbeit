import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSchemeComponent } from './open-scheme.component';

describe('OpenSchemeComponent', () => {
  let component: OpenSchemeComponent;
  let fixture: ComponentFixture<OpenSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
