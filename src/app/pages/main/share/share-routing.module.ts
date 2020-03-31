import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharePage } from './share.page';

const routes: Routes = [
  {
    path: '',
    component: SharePage
  },
  {
    path: 'why-contact',
    loadChildren: () => import('./why-contact/why-contact.module').then( m => m.WhyContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharePageRoutingModule {}
