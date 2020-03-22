import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ContactTracePageRoutingModule} from './contact-trace-routing.module';

import {ContactTracePage} from './contact-trace.page';
import {Routes} from '@angular/router';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContactTracePageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
    declarations: [ContactTracePage]
})
export class ContactTracePageModule {
}
