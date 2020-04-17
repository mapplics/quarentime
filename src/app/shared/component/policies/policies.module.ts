import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PoliciesComponent} from './policies.component';
import {PoliciesModalComponent} from './policies-modal/policies-modal.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [
        PoliciesComponent,
        PoliciesModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule
    ],
    exports: [
        PoliciesComponent
    ],
    entryComponents: [
        PoliciesModalComponent
    ]
})
export class PoliciesModule { }
