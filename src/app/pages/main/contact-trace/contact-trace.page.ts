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


        let topInit = 0;
        let leftInit = 2;
        // const height = this.platform.height() * 0.50 - 60;
        const width = this.platform.width();

        const height = this.elementView.nativeElement.offsetHeight;

        const diametro = 58;
        const radio = diametro / 2;

        // ccalculo cuantos entran orizontalmente
        const totalWidth = Math.trunc(width / (diametro + 2));
        // calculo cuantos entran verticalmente
        const totalHeight = Math.trunc(height / (diametro + 2));
        const total = (totalHeight) * totalWidth - 1;

        //let height2 = (this.elementView.nativeElement);


        const centerY = height / 2;
        const centerX = width / 2;

        this.centerX = centerX - radio;
        this.centerY = centerY - radio;


        // formo la cuadrilla con los spacios para distribuir los circulos
        for (let i = 0; i < totalHeight; i++) {
            for (let j = 0; j < totalWidth; j++) {
                // controlo que no pise el centro
                /*if ((leftInit < (centerX) && (topInit < (centerY - radio) || topInit > (centerY + radio)))
                    || (topInit < (centerY - radio) || topInit > (centerX + radio) || leftInit < (centerX - radio) || leftInit > (centerX + radio))
                    || (leftInit > (centerX + radio) && (topInit < (centerY - radio) || topInit > (centerY + radio)))) {
                    this.spaces.push({
                        top: topInit + 'px',
                        left: leftInit + 'px'
                    });
                } else {
                    debugger;
                    const error = false;
                }*/

                const overlap = this.collision(width / 2, height / 2, leftInit + radio, topInit + radio, diametro);
                if (!overlap) {
                    this.spaces.push({
                        top: topInit + 'px',
                        left: leftInit + 'px'
                    });
                } else {
                    // debugger;
                }


                leftInit += diametro + 2;
            }
            leftInit = 2;
            topInit += diametro + 2;

        }

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
        this.prepareCircle('ML', 'purple');

    }

    collision(x1: number, y1: number, x2: number, y2: number, r: number) {
        //for (i = 0; i < circles.length; i++) {
        //Distance formula
        if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) < r) {
            return true;
        }
        return false;
        // }
    }


    circleCollisionDetect(c1, c2) {
        var dx = c1[0] - c2[0];
        var dy = c1[1] - c2[1];
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance < c1[2] + c2[2];
    }

    circlePointCollisionDetect(p, c) {
        const dx = p[0] - c[0];
        const dy = p[1] - c[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < c[2];
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
