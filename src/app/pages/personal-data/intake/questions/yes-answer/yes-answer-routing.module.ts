import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YesAnswerPage } from './yes-answer.page';

const routes: Routes = [
  {
    path: '',
    component: YesAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YesAnswerPageRoutingModule {}
