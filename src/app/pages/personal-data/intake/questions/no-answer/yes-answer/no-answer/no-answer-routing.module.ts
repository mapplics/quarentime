import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAnswerPage } from './no-answer.page';

const routes: Routes = [
  {
    path: '',
    component: NoAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoAnswerPageRoutingModule {}
