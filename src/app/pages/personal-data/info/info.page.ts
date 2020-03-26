import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {NavController, PopoverController} from '@ionic/angular';
import {CountryModel, PersonalDataModel} from '../models/personal-data.model';
import {PersonalDataService} from '../personal-data.service';
import {CountryPopoverComponent} from './country-popover/country-popover.component';
import {ArrayHelper} from '../../../shared/helpers/array.helper';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage extends PageInterface implements OnInit {

  form: FormGroup;
  countries: CountryModel[];

  constructor(public translateService: TranslateService,
              private formBuilder: FormBuilder,
              private navController: NavController,
              private personalDataService: PersonalDataService,
              private popoverController: PopoverController) {
    super(translateService, english, spanish);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.form.valid) {
      this.saveData();
    }
  }

  ngOnInit() {
    this.countries = this.personalDataService.countries;
    this.countries = ArrayHelper.sortAsc(this.countries, 'name', this.currentLanguage);
    this.initForm();
  }

  get currCountry() {
    return this.form.get('country').value;
  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: CountryPopoverComponent,
      componentProps: {countries : this.countries, currentLanguage: this.currentLanguage},
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then((resp) => {
      if (resp.data) {
        this.form.get('country').setValue(resp.data);
        this.form.get('phone').setValue(resp.data.prefix);
      }
    });
    return await popover.present();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surename: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      country: ['', Validators.required]
    });
    if (this.personalDataService.personalData) {
      const data = this.personalDataService.personalData;
      this.form.get('name').setValue(data.name);
      this.form.get('surename').setValue(data.surename);
      this.form.get('age').setValue(data.age);
      this.form.get('phone').setValue(data.phone);
      this.form.get('country').setValue(data.country);
    }

    const currCountry = this.countries.find(x => x.tag === 'ar');
    this.form.get('country').setValue(currCountry);
    this.form.get('phone').setValue(currCountry.prefix);
  }

  saveData(): void {
    const data = new PersonalDataModel(
        this.form.value.name,
        this.form.value.surename,
        this.form.value.age,
        this.form.value.country,
        this.form.value.phone
    );
    this.personalDataService.personalData = data;

    // send data to server
    this.personalDataService.sendPersonalInformation().subscribe(
      (response) => console.log(response)
    )

    if (!!(+localStorage.getItem('codeVerified'))) {
      this.navController.navigateRoot('personal-data/intake');
    } else {
      this.navController.navigateRoot('personal-data/verify');
    }
  }

  policies(): void {
    // todo
  }
}
