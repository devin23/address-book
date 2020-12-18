import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { AlertController } from '@ionic/angular';
import { pull } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  favoritesCount = 0;
  selectedFilterType = 'all';

  _filterContacts: BehaviorSubject<Contact[]> = new BehaviorSubject([]);
  filterContacts$ = this._filterContacts.asObservable();

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
    this.filterContacts();
  }

  filterContacts(filterType?: 'all' | 'favorite',){
    if(filterType){
      this.selectedFilterType = filterType;
    }

    let filteredContacts = [];

    if(this.selectedFilterType){
      if(this.selectedFilterType === 'all'){
        filteredContacts = this.contacts;
      } else {
        filteredContacts = this.contacts.filter(contact => contact.favorite);
      }
    }

    this._filterContacts.next(filteredContacts);
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
            this.filterContacts();
            await closeFunction('delete');
          }
        }
      ]
    });

    await alert.present()
  }
}
