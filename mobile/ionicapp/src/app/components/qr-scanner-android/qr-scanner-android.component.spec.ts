import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrScannerAndroidComponent } from './qr-scanner-android.component';

describe('QrScannerAndroidComponent', () => {
  let component: QrScannerAndroidComponent;
  let fixture: ComponentFixture<QrScannerAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrScannerAndroidComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
