import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { AlertController, ModalController } from '@ionic/angular';
import { pull } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Label } from 'src/app/models/label.model';
import { PlatformService } from '../platfom/platform.service';
import { ManageLabelsComponent } from 'src/app/components/labels/manage-labels/manage-labels.component';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  favoritesCount = 0;
  selectedFilterType: 'all' | 'favorites' = 'all';
  
  labels: Label[] = [];
  selectedLabel: Label;

  _filterContacts: BehaviorSubject<Contact[]> = new BehaviorSubject([]);
  filterContacts$ = this._filterContacts.asObservable();

  contacts: Contact[] = [];

  constructor(private alertController: AlertController, private platformService: PlatformService, private modalController: ModalController) {
    this.filterContacts();
  }

  filterContacts(filterType?: 'all' | 'favorites',label?:Label){
    if(filterType){
      this.selectedFilterType = filterType;
      this.selectedLabel = null;
    }
    if(label){
      this.selectedLabel = label;
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

  async openManageLabels(){
    const modal = await this.modalController.create({
      component: ManageLabelsComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'manage-labels-modal',
      backdropDismiss: false,
    });

    await modal.present();

    return await modal.onWillDismiss();
  }

}
