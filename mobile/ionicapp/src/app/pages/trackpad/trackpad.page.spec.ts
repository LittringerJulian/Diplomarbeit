import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackpadPage } from './trackpad.page';

describe('TrackpadPage', () => {
  let component: TrackpadPage;
  let fixture: ComponentFixture<TrackpadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackpadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackpadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
