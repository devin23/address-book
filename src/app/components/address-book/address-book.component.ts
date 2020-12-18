import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { ModalController } from '@ionic/angular';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { Contact } from '../../models/contact.model';
import { PlatformService } from 'src/app/services/platfom/platform.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {

  columns = [
    {
      columnDef: 'image',
      minVisibleWidth: 0,
    },{
      columnDef: 'name',
      minVisibleWidth: 0,
    },{
      columnDef: 'address',
      minVisibleWidth: 400,
    },{
      columnDef: 'email',
      minVisibleWidth: 600,
    },{
      columnDef: 'phone',
      minVisibleWidth: 800,
    },
  ];
  displayedColumns: string[];

  constructor(
    public addressBookService: AddressBookService, 
    private modalController: ModalController, 
    public platformService: PlatformService,
  ) { }

  ngOnInit() {
    this.setDisplayColumns();
    window.onresize = () => this.setDisplayColumns();
  }

  setDisplayColumns() {
    const windowWidth = window.innerWidth;
    this.displayedColumns = this.columns
      .filter((column) => column.minVisibleWidth < windowWidth)
      .map((column) => column.columnDef);
  }

  async createContact(){
    const modal = await this.modalController.create({
      component: EditContactComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'contact-modal',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  async viewContact(contact: Contact){
    const modal = await this.modalController.create({
      component: ViewContactComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'contact-modal',
      componentProps:{contact: contact},
    });

    return await modal.present();
  }

  stopProp(event){
    event.stopPropagation();
  }

}
