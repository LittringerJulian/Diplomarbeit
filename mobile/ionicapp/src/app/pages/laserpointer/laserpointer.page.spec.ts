import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaserpointerPage } from './laserpointer.page';

describe('LaserpointerPage', () => {
  let component: LaserpointerPage;
  let fixture: ComponentFixture<LaserpointerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserpointerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaserpointerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
