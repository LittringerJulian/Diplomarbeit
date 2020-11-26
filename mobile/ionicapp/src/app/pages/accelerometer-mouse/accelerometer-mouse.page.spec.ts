import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccelerometerMousePage } from './accelerometer-mouse.page';

describe('AccelerometerMousePage', () => {
  let component: AccelerometerMousePage;
  let fixture: ComponentFixture<AccelerometerMousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelerometerMousePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccelerometerMousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
