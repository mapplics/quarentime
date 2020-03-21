import { IonicModule } from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

// @ts-ignore
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})

const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  }
];
export class Tab1PageModule {}
