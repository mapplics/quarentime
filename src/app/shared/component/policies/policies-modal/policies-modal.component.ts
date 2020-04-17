import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-policies-modal',
  templateUrl: './policies-modal.component.html',
  styleUrls: ['./policies-modal.component.scss'],
})
export class PoliciesModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onCloseModal(): void {
    this.modalController.dismiss();
  }

}
