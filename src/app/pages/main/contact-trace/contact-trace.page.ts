import {Component, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-contact-trace',
    templateUrl: './contact-trace.page.html',
    styleUrls: ['./contact-trace.page.scss'],
})
export class ContactTracePage extends PageInterface implements OnInit {
    circles: CirclesModel[] = [];
    spaces: SpacesWindowModel[] = [];

    constructor(public translateService: TranslateService,
                private platform: Platform,
                private navCtrl: NavController) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit() {
        console.log('width', this.platform.width());
        console.log('height', this.platform.height());
        this.calculateRamdon();

    }

    onShareContact() {
        this.navCtrl.navigateForward('main/contact-trace/share');
    }

    onShowDetails(): void {
        this.navCtrl.navigateForward('main/contact-trace/share/why-contact');
    }

    calculateRamdon() {
        this.spaces = [];


        let topInit = 100;
        let leftInit = 5;
        const height = this.platform.height() * 0.50 - 60;
        const width = this.platform.width() - 80;
        // ccalculo cuantos entran orizontalmente
        const totalWidth = Math.trunc(width / 60);
        // calculo cuantos entran verticalmente
        const totalHeight = Math.trunc(height / 60);
        // const total = totalHeight * totalWidth;

        // formo la cuadrilla con los spacios para distribuir los circulos
        for (let i = 0; i <= totalHeight; i++) {
            for (let j = 0; j <= totalWidth; j++) {
                this.spaces.push({
                    top: topInit + 'px',
                    left: leftInit + 'px'
                });
                leftInit += 60;
            }
            leftInit = 5;
            topInit += 60;

        }

        // esto deberia venir del servidor title and color
        this.prepareCircle('NL', 'gray-blue');
        this.prepareCircle('ML', 'purple');
        this.prepareCircle('JM', 'gold');
        this.prepareCircle('LA', 'red');


    }

    prepareCircle(title, color) {
        // calculo un numero ramdo para determinar la posicion
        let random = Math.floor(Math.random() * (this.spaces.length));
        this.circles.push({
            title,
            color,
            top: this.spaces[random].top,
            left: this.spaces[random].left
        });
        // elimino este espacio para q no se repita
        this.spaces.splice(random, 1);
    }

    get totalPurple() {
        return this.circles.filter(c => c.color === 'purple').length;
    }

    get totalGold() {
        return this.circles.filter(c => c.color === 'gold').length;
    }

    get totalGray() {
        return this.circles.filter(c => c.color === 'gray-blue').length + 1;
    }

    get totalRed() {
        return this.circles.filter(c => c.color === 'red').length;
    }

    get totalLightBlue() {
        return this.circles.filter(c => c.color === 'light-blue').length;
    }

}
