import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSchemeComponent } from './generate-scheme.component';

describe('GenerateSchemeComponent', () => {
  let component: GenerateSchemeComponent;
  let fixture: ComponentFixture<GenerateSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
