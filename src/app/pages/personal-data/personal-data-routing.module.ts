import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDataPage } from './personal-data.page';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: PersonalDataPage,
    children: [
      {
        path: 'info',
        loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then( m => m.QuestionsPageModule)
      },
      {
        path: 'symptoms',
        loadChildren: () => import('./symptoms/symptoms.module').then( m => m.SymptomsPageModule)
      },
      {
        path: '',
        redirectTo: '/personal-data/info',
        pathMatch: 'full'
      },
    ]
  },

=======
    component: PersonalDataPage
  }
>>>>>>> develop
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDataPageRoutingModule {}
