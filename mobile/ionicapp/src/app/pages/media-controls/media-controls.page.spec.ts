import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaControlsPage } from './media-controls.page';

describe('MediaControlsPage', () => {
  let component: MediaControlsPage;
  let fixture: ComponentFixture<MediaControlsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaControlsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaControlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
