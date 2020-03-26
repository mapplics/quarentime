import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAnswerPage } from './no-answer.page';

const routes: Routes = [
  {
    path: '',
    component: NoAnswerPage
  },
  {
    path: 'noAnswer',
    loadChildren: () => import('./no-answer/no-answer.module').then( m => m.NoAnswerPageModule)
  },
  {
    path: 'yesAnswer',
    loadChildren: () => import('./yes-answer/yes-answer.module').then( m => m.YesAnswerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoAnswerPageRoutingModule {}
