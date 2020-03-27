
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPage} from './main.page';


const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'contact-trace',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('./contact-trace/contact-trace.module').then(m => m.ContactTracePageModule)
          },
          {
            path: 'share',
            loadChildren: () => import('./share/share.module').then( m => m.SharePageModule)
          },
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'symptoms',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('./symptoms/symptoms.module').then(m => m.SymptomsPageModule)
          }
        ]
      },
      {
        path: 'invite',
        children: [
          {
            path: '',
            loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'contact-trace',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
