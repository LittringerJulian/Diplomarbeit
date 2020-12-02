import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySchemesComponent } from './my-schemes.component';

describe('MySchemesComponent', () => {
  let component: MySchemesComponent;
  let fixture: ComponentFixture<MySchemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySchemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
