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

@Component({
    selector: 'app-contact-trace',
    templateUrl: './contact-trace.page.html',
    styleUrls: ['./contact-trace.page.scss'],
})
export class ContactTracePage extends PageInterface implements OnInit, AfterViewInit {
    circles: CirclesModel[] = [];
    spaces: SpacesWindowModel[] = [];

    centerX: number;
    centerY: number;

    widthBase: string;
    textBase: string;

    //@ViewChild('content', {read: ElementRef, static: false}) elementView: ElementRef;
    @ViewChild('content2', {read: ElementRef, static: false}) elementView: ElementRef;


    constructor(public translateService: TranslateService,
                private platform: Platform,
                private navCtrl: NavController) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit() {
        console.log('width', this.platform.width());
        console.log('height', this.platform.height());

    }

    ngAfterViewInit() {
        const a = this.elementView.nativeElement.offsetHeight;

    }

    ionViewDidEnter() {
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
        const totalWidth = Math.trunc(width / (diametro + 2));
        // calculo cuantos entran verticalmente
        const totalHeight = Math.trunc(height / (diametro + 2));
        // total que entra le resto 1 para la bola mas grande
        const total = (totalHeight) * totalWidth - 3;

        const values = this.calculateWidthHeight(width, height, diametro, 50, diametro);

        console.log(values);

        //let height2 = (this.elementView.nativeElement);


        const centerY = height / 2;
        const centerX = width / 2;

        this.centerX = centerX - radio;
        this.centerY = centerY - radio;


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


    }

    collision(x1: number, y1: number, x2: number, y2: number, r: number) {
        // Distance formula
        if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r) {
            return true;
        }
        return false;
    }

    prepareCircle(title, color) {
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
