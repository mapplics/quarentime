import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhyContactPage } from './why-contact.page';

describe('WhyContactPage', () => {
  let component: WhyContactPage;
  let fixture: ComponentFixture<WhyContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
