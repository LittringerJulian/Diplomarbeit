import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSchemesComponent } from './public-schemes.component';

describe('PublicSchemesComponent', () => {
  let component: PublicSchemesComponent;
  let fixture: ComponentFixture<PublicSchemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSchemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
