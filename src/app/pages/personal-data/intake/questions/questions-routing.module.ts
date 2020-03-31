import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsPage } from './questions.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPage
  },
  {
    path: 'yesAnswer',
    loadChildren: () => import('./yes-answer/yes-answer.module').then( m => m.YesAnswerPageModule)
  },
  {
    path: 'noAnswer',
    loadChildren: () => import('./no-answer/no-answer.module').then( m => m.NoAnswerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsPageRoutingModule {}
