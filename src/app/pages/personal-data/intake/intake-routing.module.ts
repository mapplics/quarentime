import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntakePage } from './intake.page';

const routes: Routes = [
  {
    path: '',
    component: IntakePage,
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm-info/confirm-info.module').then( m => m.ConfirmInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntakePageRoutingModule {}
