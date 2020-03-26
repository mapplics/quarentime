import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhyContactPage } from './why-contact.page';

const routes: Routes = [
  {
    path: '',
    component: WhyContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhyContactPageRoutingModule {}
