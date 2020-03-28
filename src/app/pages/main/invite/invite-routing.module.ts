import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitePage } from './invite.page';

const routes: Routes = [
  {
    path: '',
    component: InvitePage
  },
  {
    path: 'congratulation',
    loadChildren: () => import('./congratulation/congratulation.module').then(m => m.CongratulationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitePageRoutingModule {}
