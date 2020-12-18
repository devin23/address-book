import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { sortBy } from 'lodash';
import { AlertController } from '@ionic/angular';
import { pull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  sortedContacts: Contact[] = [];

  contacts: Contact[] = [
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
    this.sortContacts();
  }

  sortContacts(){
    this.sortedContacts = sortBy(this.contacts,['name']);
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
            pull(this.contacts,contact);
            this.sortContacts();
            await closeFunction('delete');
          }
        }
      ]
    });

    await alert.present()
  }
}
