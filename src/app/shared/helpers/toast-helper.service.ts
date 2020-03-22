import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastHelperService {

    constructor(private toastCtrl: ToastController) {
    }

    async presentToast(message, color = 'danger') {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 5000
        });
        await toast.present();
    }

    successToast(message: string): void {
        this.presentToast(message, 'success');
    }

    errorToast(message: string, data = []): void {
        this.presentToast(message, 'danger');
    }

    warningToast(message: string): void {
        this.presentToast(message, 'warning');
    }
}
