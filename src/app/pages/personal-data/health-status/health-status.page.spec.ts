import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthStatusPage } from './health-status.page';

describe('HealthStatusPage', () => {
  let component: HealthStatusPage;
  let fixture: ComponentFixture<HealthStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
