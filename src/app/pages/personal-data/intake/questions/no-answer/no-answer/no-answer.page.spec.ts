import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoAnswerPage } from './no-answer.page';

describe('NoAnswerPage', () => {
  let component: NoAnswerPage;
  let fixture: ComponentFixture<NoAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
