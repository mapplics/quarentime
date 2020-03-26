import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyContactPageRoutingModule } from './why-contact-routing.module';

import { WhyContactPage } from './why-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhyContactPageRoutingModule
  ],
  declarations: [WhyContactPage]
})
export class WhyContactPageModule {}
