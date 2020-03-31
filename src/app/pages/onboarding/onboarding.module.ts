import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import {TranslateModule} from "@ngx-translate/core";
import {CircleAnimationModule} from '../../shared/component/circle-animation/circle-animation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OnboardingPageRoutingModule,
        TranslateModule,
        CircleAnimationModule
    ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
