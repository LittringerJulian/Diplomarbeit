import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchemePortraitComponent } from './edit-scheme-portrait.component';

describe('EditSchemePortraitComponent', () => {
  let component: EditSchemePortraitComponent;
  let fixture: ComponentFixture<EditSchemePortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchemePortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchemePortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
