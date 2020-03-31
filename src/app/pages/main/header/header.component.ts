import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';

import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends PageInterface implements OnInit {
    /* si esta definida esta variable se utiliza el boton back por defecto */
    @Input() defaultHref: string;
    @Input() title: string;
    /* variable utilizada para mostrar el boton atras */
    @Input() btnBack: boolean;

    /* mostrar boton de compartir*/
    @Input() btnShare: boolean;
    /* mostrar boton de ayuda*/
    @Input() btnShowDetails: boolean;
    @Input() pendings: number = 0;

    /* Evento utilizado cuando se quiere poner una accoin al boton atras*/
    @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
    /* Evento utilizado para la accion share*/
    @Output() onShare: EventEmitter<void> = new EventEmitter<void>();
    /* Evento utilizado para ver detalle*/
    @Output() showDetails: EventEmitter<void> = new EventEmitter<void>();


    constructor(public translateService: TranslateService) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit() {
    }

    get padding() {
        return '17px';
    }

    onGoBack(): void {
        this.goBack.emit();
    }

    onShareContact(): void {
        this.onShare.emit();
    }

    onShowDetail(): void {
        this.showDetails.emit();
    }

}
