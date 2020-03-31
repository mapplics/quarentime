import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {NavController, Platform} from '@ionic/angular';
import {CirclesModel} from './models/circles.model';
import {SpacesWindowModel} from './models/spaces-window.model';
import {LoadingHelperService} from '../../../shared/helpers/loading-helper.service';
import {ContactTraceService} from '../contact-trace.service';
import {take} from 'rxjs/operators';
import {GeneralResponse} from '../../../models/general-response.model';
import {ToastHelperService} from '../../../shared/helpers/toast-helper.service';
import {ContactTraceModel} from './models/contact-trace.model';
import {StorageService} from '../../../shared/services/storage.service';
import {AuthService} from '../../../providers/auth.service';
import {forkJoin} from 'rxjs';
import {ContactModel} from './models/contact.model';

@Component({
    selector: 'app-contact-trace',
    templateUrl: './contact-trace.page.html',
    styleUrls: ['./contact-trace.page.scss'],
})
export class ContactTracePage extends PageInterface implements OnInit, AfterViewInit {
    circles: CirclesModel[] = [];
    spaces: SpacesWindowModel[] = [];

    leftCenter: number;
    topCenter: number;

    widthBase: string;
    textBase: string;

    @ViewChild('content', {read: ElementRef, static: false}) elementView: ElementRef;

    contactTrace: ContactTraceModel;
    loaded: boolean;
    pendingRequests: ContactModel[];
    totalPending: number = 0;

    constructor(public translateService: TranslateService,
                private platform: Platform,
                private navCtrl: NavController,
                private loadingCtrl: LoadingHelperService,
                private toastCtrl: ToastHelperService,
                private contactTraceService: ContactTraceService,
                private storageService: StorageService,
                private authService: AuthService) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit() {}

    ngAfterViewInit() {
    }

    ionViewDidEnter() {
        // para que calcule el tamaño del div cuando ya cargo todo
        // this.contacts = [];
        this.circles = [];
        this.loaded = false;
        this.getContacts();
    }

    async getContacts() {        
        await this.loadingCtrl.presentLoading(this.translateService.instant('CONTACT.LOADING_CONTACT_TRACE'));
        //this.loadingCtrl.presentLoading(this.translateService.instant('CONTACT.LOADING_CONTACT')).then(() => {
        this.authService.refreshToken().then(() => {
            // lo de contactos no deberia ser necesario deberia tener un ep solo para endpoints
            const obsPendings = this.contactTraceService.getContacts();
            const obsContacts = this.contactTraceService.getContactTrace();

            forkJoin([obsContacts, obsPendings])
                .pipe(take(1))
                .subscribe(
                    (resp: any) => {
                        this.contactTrace = resp[0].result;
                        this.pendingRequests = resp[1].result.filter(x => x.pending);
                        this.totalPending = this.pendingRequests.length;
                        console.log(this.contactTrace);

                        this.calculateRamdon();
                        this.loadingCtrl.dismiss();
                        // this.navCtrl.navigateRoot('congratulation');
                    }, (err) => {
                        this.loadingCtrl.dismiss();
                        this.toastCtrl.errorToast(err.message);
                        // });
                    });
        });
    }

    onViewContacts() {
        this.navCtrl.navigateForward('main/contact-trace/activity');
    }

    onShowDetails(): void {
        this.navCtrl.navigateForward('main/contact-trace/share/why-contact');
    }

    calculateRamdon() {
        debugger;
        this.spaces = [];

        // variable utilzada para acumular las distancias verticales
        let topInit = 0;
        // variable utilizada para calcular la distancia horizontal
        let leftInit = 2;
        // const height = this.platform.height() * 0.50 - 60;
        const width = this.platform.width();

        const height = this.elementView.nativeElement.offsetHeight;

        const diametro = 58;
        const radio = diametro / 2;

        // calculo cuantos entran horizontalmente, 2 es el padding
        // const totalWidth = Math.trunc(width / (diametro + 2));
        // calculo cuantos entran verticalmente
        // const totalHeight = Math.trunc(height / (diametro + 2));
        // total que entra le resto 1 para la bola mas grande
        // const total = (totalHeight) * totalWidth - 3;

        const values = this.calculateWidthHeight(width, height, diametro, this.contactTrace.contacts.length, diametro);

        console.log(values);

        // let height2 = (this.elementView.nativeElement);


        const centerY = height / 2;
        const centerX = width / 2;

        this.leftCenter = centerX - radio;
        this.topCenter = centerY - radio;


        // formo la cuadrilla con los spacios para distribuir los circulos
        for (let i = 0; i < values.totalHeight; i++) {
            for (let j = 0; j < values.totalWidth; j++) {
                // controlo que no pise el centro

                const overlap = this.collision(width / 2, height / 2, leftInit + values.d2 / 2, topInit + values.d2 / 2, values.d2);
                if (!overlap) {
                    this.spaces.push({
                        top: topInit + 'px',
                        left: leftInit + 'px'
                    });
                }
                leftInit += values.d2 + 2;
            }
            leftInit = 2;
            topInit += values.d2 + 2;

        }

        this.textBase = ((values.d2 - 2) * 24 / (diametro - 2)) + 'px';
        this.widthBase = (values.d2 - 2) + 'px';

        // esto deberia venir del servidor title and color
        for (let contact of this.contactTrace.contacts) {
            //const status = contact.pending ? 'pending' : contact.status;
            // pending no se ven mas aca

            this.prepareCircle(contact.initials, contact.status);
        }

        // las bolas pending no las muestro
        // for (let contact of this.pendingRequests) {
        //     //const status = contact.pending ? 'pending' : contact.status;
        //     // pending no se ven mas aca

        //     this.prepareCircle(contact.letters, 'pending');
        // }

        this.loaded = true;
        /*
        this.prepareCircle('NL', 'gray-blue');
        this.prepareCircle('ML', 'purple');
        this.prepareCircle('JM', 'gold');
        this.prepareCircle('LA', 'red');
        this.prepareCircle('NL', 'gray-blue');
        this.prepareCircle('ML', 'purple');
        this.prepareCircle('JM', 'gold');
        this.prepareCircle('LA', 'red');
        this.prepareCircle('NL', 'gray-blue');
        this.prepareCircle('ML', 'purple');
*/


    }

    collision(x1: number, y1: number, x2: number, y2: number, r: number) {
        // Distance formula
        if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r) {
            return true;
        }
        return false;
    }

    prepareCircle(title, color) {
        debugger;
        // calculo un numero ramdo para determinar la posicion
        let random = Math.floor(Math.random() * (this.spaces.length));
        this.circles.push({
            title,
            color,
            top: this.spaces[random].top,
            left: this.spaces[random].left,
            // width: String(diametro) + 'px',
            // text: text + 'px'
        });
        // elimino este espacio para q no se repita
        this.spaces.splice(random, 1);
    }

    calculateWidthHeight(width, height, diametro, contactCount, d2) {
        // calculo cuantos entran horizontalmente, 2 es el padding
        const totalWidth = Math.trunc(width / (d2 + 2));
        // calculo cuantos entran verticalmente
        const totalHeight = Math.trunc(height / (d2 + 2));
        // total que entra le resto 1 para la bola mas grande
        const total = (totalHeight) * totalWidth - 3;
        if (contactCount <= total) {
            return {
                totalWidth,
                totalHeight,
                d2,
                total
            };
        } else {
            // pongo un diametro mas pequeño
            d2 = d2 - 2;
            return this.calculateWidthHeight(width, height, diametro, contactCount, d2);
        }
    }

    getUserState(type) {
        return (this.contactTrace ? (this.contactTrace.status === type ? 1 : 0) : 0);
    }

    get totalHealthy() {
        return this.colorCircle('healthy').length +
            this.colorCircle('healty_social_distancing').length
            this.getUserState('healthy') +
            this.getUserState('healty_social_distancing');
    }

    get totalRecovered() {
        return this.colorCircle('recovered').length; // + this.getUserState('recovered');
    }

    get totalSuspected() {
        return this.colorCircle('low_probability_suspected').length +
            this.colorCircle('high_probability_suspected').length
            this.getUserState('low_probability_suspected') +
            this.getUserState('high_probability_suspected');
    }

    get totalPositive() {
        return this.colorCircle('positive').length; // + this.getUserState('positive');
    }

    colorCircle(type: string) {
        return this.circles.filter(c => c.color === type);
    }

    // get userNameInitialWord() {
    //     return this.storageService.nameInitialWord;
    // }

    // get userStatus() {
    //     return this.storageService.userStatus;
    // }

    goToActivity(): void {
        this.navCtrl.navigateForward('main/contact-trace/activity');
    }

}
