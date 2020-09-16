import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConnectToDesktopPage } from './connect-to-desktop.page';

describe('ConnectToDesktopPage', () => {
  let component: ConnectToDesktopPage;
  let fixture: ComponentFixture<ConnectToDesktopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectToDesktopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectToDesktopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
