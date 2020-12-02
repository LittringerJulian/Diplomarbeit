import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageClipboardPage } from './image-clipboard.page';

describe('ImageClipboardPage', () => {
  let component: ImageClipboardPage;
  let fixture: ComponentFixture<ImageClipboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageClipboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageClipboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
