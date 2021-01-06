import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSchemesPage } from './list-schemes.page';

describe('ListSchemesPage', () => {
  let component: ListSchemesPage;
  let fixture: ComponentFixture<ListSchemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSchemesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSchemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
