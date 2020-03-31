import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactTracePage } from './contact-trace.page';

describe('ContactTracePage', () => {
  let component: ContactTracePage;
  let fixture: ComponentFixture<ContactTracePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTracePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactTracePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
