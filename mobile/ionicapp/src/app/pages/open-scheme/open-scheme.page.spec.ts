import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenSchemePage } from './open-scheme.page';

describe('OpenSchemePage', () => {
  let component: OpenSchemePage;
  let fixture: ComponentFixture<OpenSchemePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSchemePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenSchemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
