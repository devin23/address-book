import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../models/address';
import { ModalController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address/address.service';
import { EditAddressComponent } from '../edit-address/edit-address.component';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {

  @Input() contact: Address;

  close = async () => await this.modalController.dismiss();

  constructor(private modalController: ModalController, private addressService: AddressService) { }

  ngOnInit() {}

  async delete(){
    await this.addressService.delete(this.contact, this.close);
  }

  async edit(){
    const mobileView = Math.min(window.innerWidth, window.innerHeight) < 500;

    const modal = await this.modalController.create({
      component: EditAddressComponent,
      cssClass: mobileView ? '' : 'address-modal',
      componentProps: {address: this.contact},
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
