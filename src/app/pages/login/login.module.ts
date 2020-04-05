import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';

import {TranslateModule} from '@ngx-translate/core';
import {CircleAnimationModule} from '../../shared/component/circle-animation/circle-animation.module';
import {OutbreakSimulatorModule} from '../../shared/component/outbreak-simulator/outbreak-simulator.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        TranslateModule,
        CircleAnimationModule,
        OutbreakSimulatorModule
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
