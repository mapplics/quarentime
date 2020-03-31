import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingHelperService {

    constructor(private loadingCtrl: LoadingController,
                private translate: TranslateService) {
    }

    async presentLoading(message) {
        const loading = await this.loadingCtrl.create({
            message
        });

        return await loading.present();
    }

    dismiss(): void {
        this.loadingCtrl.dismiss();
    }
}
