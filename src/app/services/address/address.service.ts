import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';
import { sortBy } from 'lodash';
import { AlertController } from '@ionic/angular';
import { pull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  sortedAddresses: Address[] = [];

  addresses: Address[] = [
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 2', address: '' , phone: 2234567890, email: ''},
    {name: 'person 3', address: '' , phone: 3234567890, email: ''},
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 4', address: '' , phone: 4234567890, email: ''},
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 2', address: '' , phone: 2234567890, email: ''},
    {name: 'person 3', address: '' , phone: 3234567890, email: ''},
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 1', address: '123 Secret Pl Garden City, NM 12345' , phone: 1234567890, email: 'test@test.com'},
    {name: 'person 4', address: '' , phone: 4234567890, email: ''},
  ]

  constructor(private alertController: AlertController) {
    this.sortAddresses();
  }

  sortAddresses(){
    this.sortedAddresses = sortBy(this.addresses,['name']);
  }

  async delete(contact, closeFunction){
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to <strong>delete</strong> this contact?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: async () => {
            pull(this.addresses,contact);
            this.sortAddresses();
            await closeFunction('delete');
          }
        }
      ]
    });

    await alert.present()
  }
}
