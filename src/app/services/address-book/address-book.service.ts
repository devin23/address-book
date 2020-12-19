import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { AlertController } from '@ionic/angular';
import { pull } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Label } from 'src/app/models/label.model';
import { PlatformService } from '../platfom/platform.service';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  favoritesCount = 0;
  selectedFilterType: 'all' | 'favorites' = 'all';
  
  labels: Label[] = [
    {title:'test 1', id: 1, count: 0},
    {title:'test 2', id: 2, count: 0},
    {title:'test 3', id: 3, count: 0},
    {title:'test 4', id: 4, count: 0},
    {title:'test 5', id: 5, count: 0},
    {title:'test 6', id: 6, count: 0},
    {title:'test 7', id: 7, count: 0},
  ];
  selectedLabel: Label;

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

  constructor(private alertController: AlertController, private platformService: PlatformService) {
    this.filterContacts();
  }

  filterContacts(filterType?: 'all' | 'favorites',label?:Label){
    if(filterType){
      this.selectedFilterType = filterType;
      this.selectedLabel = null;
    }
    if(label){
      this.selectedLabel = label
      this.selectedFilterType = null;
    }

    let filteredContacts = [];

    if(this.selectedFilterType){
      if(this.selectedFilterType === 'all'){
        filteredContacts = this.contacts;
      } else {
        filteredContacts = this.contacts.filter(contact => contact.favorite);
      }
    } else if (this.selectedLabel){
      filteredContacts = this.contacts.filter(contact => contact.labels?.includes(this.selectedLabel.id));
    }

    this._filterContacts.next(filteredContacts);
  }

  async deleteContact(contact, closeFunction){
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to <strong>delete</strong> this contact?',
      buttons: [
        'Cancel',
        {
          text: 'Confirm',
          handler: async () => {
            this.updateLabelCounts(contact.labels,null);
            pull(this.contacts,contact);
            this.filterContacts();
            await this.platformService.showToast(contact.name ? contact.name + ' deleted!' : 'Deleted!');
            await closeFunction('delete');
          }
        }
      ]
    });

    await alert.present()
  }

  updateLabelCounts(oldLabels: number[], newLabels: number[]){
    if(oldLabels){
      oldLabels.forEach( labelId => this.labelCountUpdate(labelId, -1));
    }
    if(newLabels){
      newLabels.forEach( labelId => this.labelCountUpdate(labelId, 1));
    }
  }

  labelCountUpdate(labelId:number,countChange: number){
    const foundLabel = this.labels.find( label => label.id === labelId);

    if(foundLabel){
      foundLabel.count += countChange;
    }
  }

  updateLabels(labels: Label[], deletedLabelIds: number[]){
    this.labels = labels;

    this.contacts.forEach(contact => {
      if(contact.labels){
        pull(contact.labels,deletedLabelIds);
      }
    });
  }

}
