import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {ActivatedRoute} from '@angular/router';
import {LoadingHelperService} from '../../../shared/helpers/loading-helper.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage extends PageInterface implements OnInit {

  cards: any[];
  colors = {
    healthy: 'BLUE',
    healty_social_distancing: 'BLUE',
    low_probability_suspected: 'YELLOW',
    high_probability_suspected: 'YELLOW',
    flu_like: 'BLUE',
    positive: 'RED',
    recovered: 'PURPLE'
  };

  status: any;
  colorTranslation: string;

  constructor(public translateService: TranslateService,
              private route: ActivatedRoute,
              private loadingController: LoadingHelperService) {
    super(translateService, english, spanish, macedonian, germany, dutch);
    this.getTranslations('HELP');
  }

  ngOnInit() {
    this.loadingController.presentLoading(this.translates.LOADING).then(() => {
      this.route.queryParams.subscribe(params => {
        this.status = params.status;
        this.colorTranslation = this.getColor();
        this.loadingController.dismiss();
      });
    });

  }

  toggleCard(card): void {
    card.selected = !card.selected;
  }

  getColor(): string {
    switch (this.status.status) {
      case 'healthy':
      case 'healty_social_distancing' :
      case 'flu_like':
        return 'BLUE';
      case 'low_probability_suspected':
      case 'high_probability_suspected':
        return 'YELLOW';
      case 'recovered': return 'PURPLE';
      case 'positive': return 'RED';
    }
  }
}
