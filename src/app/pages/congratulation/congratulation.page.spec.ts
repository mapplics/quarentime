import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CongratulationPage } from './congratulation.page';

describe('CongratulationPage', () => {
  let component: CongratulationPage;
  let fixture: ComponentFixture<CongratulationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratulationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CongratulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});