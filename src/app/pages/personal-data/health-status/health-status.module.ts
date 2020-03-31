import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthStatusPageRoutingModule } from './health-status-routing.module';

import { HealthStatusPage } from './health-status.page';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HealthStatusPageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
  declarations: [HealthStatusPage]
})
export class HealthStatusPageModule {}
