import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ModalController } from '@ionic/angular';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { PlatformService } from 'src/app/services/platfom/platform.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {

  @Input() contact: Contact;

  close = async () => await this.modalController.dismiss();

  constructor(
    private modalController: ModalController,
    private addressBookService: AddressBookService,
    public platformService: PlatformService,
  ) { }

  ngOnInit() {}

  async delete(){
    await this.addressBookService.delete(this.contact, this.close);
  }

  async edit(){
    const modal = await this.modalController.create({
      component: EditContactComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'contact-modal',
      componentProps: {contact: this.contact},
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(async data => {
      if(data.data === 'delete'){
        setTimeout( async () => await this.close());
      }
    });

    return await modal.present();
  }

  favorite(){
    this.contact.favorite = !this.contact.favorite;
    this.addressBookService.favoritesCount += this.contact.favorite ? 1 : -1;
    this.addressBookService.filterContacts();
  }

}
