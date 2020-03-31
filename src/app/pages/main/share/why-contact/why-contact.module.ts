import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyContactPageRoutingModule } from './why-contact-routing.module';

import { WhyContactPage } from './why-contact.page';
import {HeaderModule} from "../../header/header.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WhyContactPageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
  declarations: [WhyContactPage]
})
export class WhyContactPageModule {}
