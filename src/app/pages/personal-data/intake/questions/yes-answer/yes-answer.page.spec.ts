import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YesAnswerPage } from './yes-answer.page';

describe('YesAnswerPage', () => {
  let component: YesAnswerPage;
  let fixture: ComponentFixture<YesAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesAnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YesAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
