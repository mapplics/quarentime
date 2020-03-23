import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage extends PageInterface implements OnInit {

  cards: any[];

  constructor(public translateService: TranslateService) {
    super(translateService, english, spanish)
  }

  ngOnInit() {
    this.cards = [
      {
        color: 'gray-blue',
        title: 'HELP.HEALTHY.TITLE',
        content: 'HELP.HEALTHY.TEXT',
        selected: true
      },
      {
        color: 'purple',
        title: 'HELP.RECOVERED.TITLE',
        content: 'HELP.RECOVERED.TEXT',
        selected: false
      },
      {
        color: 'light-blue',
        title: 'HELP.TESTED_POSITIVE.TITLE',
        content: 'HELP.TESTED_POSITIVE.TEXT',
        selected: false
      },
      {
        color: 'gold',
        title: 'HELP.POTENTIAL_CARRIER.TITLE',
        content: 'HELP.POTENTIAL_CARRIER.TEXT',
        selected: false
      },
      {
        color: 'red',
        title: 'HELP.HIGH_RISK.TITLE',
        content: 'HELP.HIGH_RISK.TEXT',
        selected: false
      }
    ];
  }

  toggleCard(card): void {
    card.selected = !card.selected;
  }

}
