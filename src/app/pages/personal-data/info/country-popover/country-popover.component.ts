import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {CountryModel} from '../../models/personal-data.model';
import {debug} from 'util';

@Component({
  selector: 'country-popover',
  templateUrl: './country-popover.component.html',
  styleUrls: ['./country-popover.component.scss'],
})
export class CountryPopoverComponent implements OnInit {

  countries: CountryModel[];

  constructor(private popoverController: PopoverController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.countries = this.navParams.data.countries;
  }

  dismiss(country: CountryModel): void {
    this.popoverController.dismiss(country);
  }
}
