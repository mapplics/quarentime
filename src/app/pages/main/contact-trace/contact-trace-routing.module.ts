import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactTracePage } from './contact-trace.page';

const routes: Routes = [
  {
    path: '',
    component: ContactTracePage
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactTracePageRoutingModule {}
