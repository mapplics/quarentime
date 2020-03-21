import {Component, Input, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends PageInterface implements OnInit {

  @Input() title: string;
  @Input() stepsCompleted: number = 1;

  constructor(public translateService: TranslateService) {
    super(translateService, english, spanish);
  }

  ngOnInit() {}

  isCompleted(step): boolean {
    return this.stepsCompleted >= step;
  }

  navigateTo(): void {}
}
