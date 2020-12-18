import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import {PhonePipe} from '../../pipes/phone.pipe';
import { ModalController } from '@ionic/angular';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { Contact } from '../../models/contact.model';

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

  constructor(public addressBookService: AddressBookService, private modalController: ModalController) { }

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

  async createContact(){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: EditContactComponent,
      cssClass: mobileView ? '' : 'contact-modal',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  async viewContact(contact: Contact){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: ViewContactComponent,
      cssClass: mobileView ? '' : 'contact-modal',
      componentProps:{contact: contact},
    });

    return await modal.present();
  }



}
