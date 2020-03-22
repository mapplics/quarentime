import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalDataPageRoutingModule } from './personal-data-routing.module';
import { PersonalDataPage } from './personal-data.page';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderModule} from './header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalDataPageRoutingModule,
        TranslateModule,
        HeaderModule
    ],
    declarations: [PersonalDataPage]
})
export class PersonalDataPageModule {}
