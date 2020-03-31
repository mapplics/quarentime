import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YesAnswerPage } from './yes-answer.page';

const routes: Routes = [
  {
    path: '',
    component: YesAnswerPage
  },
  {
    path: 'noAnswer',
    loadChildren: () => import('../yes-answer/no-answer/no-answer.module').then(m => m.NoAnswerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YesAnswerPageRoutingModule {}
