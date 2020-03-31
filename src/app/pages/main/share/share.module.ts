import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SharePageRoutingModule} from './share-routing.module';

import {SharePage} from './share.page';
import {HeaderModule} from '../header/header.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharePageRoutingModule,
        HeaderModule,
        TranslateModule
    ],
    declarations: [SharePage]
})
export class SharePageModule {
}
