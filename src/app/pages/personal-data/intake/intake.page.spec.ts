import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntakePage } from './intake.page';

describe('IntakePage', () => {
  let component: IntakePage;
  let fixture: ComponentFixture<IntakePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
