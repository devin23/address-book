import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ModalController } from '@ionic/angular';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {

  @Input() contact: Contact;

  close = async () => await this.modalController.dismiss();

  constructor(private modalController: ModalController, private addressBookService: AddressBookService) { }

  ngOnInit() {}

  async delete(){
    await this.addressBookService.delete(this.contact, this.close);
  }

  async edit(){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: EditContactComponent,
      cssClass: mobileView ? '' : 'contact-modal',
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

}
