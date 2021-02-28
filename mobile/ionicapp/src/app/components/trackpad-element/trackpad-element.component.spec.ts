import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackpadElementComponent } from './trackpad-element.component';

describe('TrackpadElementComponent', () => {
  let component: TrackpadElementComponent;
  let fixture: ComponentFixture<TrackpadElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackpadElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackpadElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
