import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address/address.service';
import {PhonePipe} from '../../pipes/phone.pipe';
import { ModalController } from '@ionic/angular';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {

  columns = [
    {
      title: 'Name',
      attr: 'name',
      minVisibleWidth: 0,
    },{
      title: 'Address',
      attr: 'address',
      minVisibleWidth: 400,
    },{
      title: 'Email',
      attr: 'email',
      minVisibleWidth: 600,
    },{
      title: 'Phone',
      attr: 'phone',
      minVisibleWidth: 800,
      pipe: new PhonePipe(),
    },
  ];
  displayedColumns: string[];

  constructor(public addressService: AddressService, private modalController: ModalController) { }

  ngOnInit() {
    this.setDisplayColumns();
    window.onresize = () => this.setDisplayColumns();
  }

  setDisplayColumns() {
    const windowWidth = window.innerWidth;
    this.displayedColumns = this.columns
      .filter((column) => column.minVisibleWidth < windowWidth)
      .map((column) => column.title);
  }

  async createAddress(){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: EditAddressComponent,
      cssClass: mobileView ? '' : 'address-modal',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  async viewContact(contact: Address){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: ViewContactComponent,
      cssClass: mobileView ? '' : 'address-modal',
      componentProps:{contact: contact},
    });

    return await modal.present();
  }



}
