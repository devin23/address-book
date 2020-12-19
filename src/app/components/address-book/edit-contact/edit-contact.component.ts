import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { cloneDeep, pull } from 'lodash';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { SelectLabelComponent } from '../../labels/select-label/select-label.component';
import { Label } from 'src/app/models/label.model';
import { PlatformService } from 'src/app/services/platfom/platform.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

  title = 'Contact';

  @Input() set contact(val:Contact){
    if(val){
      this.edit = true;
      this.originalContact = val;
      this._contact = cloneDeep(val);
      this.setContactLabels();
    }
  }
  @Input() set label(label:Label){
    if(label){
      if(this.contact.labels){
        this.contact.labels.push(label.id)
      } else {
        this.contact.labels = [label.id];
      }
      this.title += ' to ' + label.title;
      this.setContactLabels();
    }
  }
  get contact(){
    return this._contact;
  }
  _contact:Contact = {};
  originalContact;
  edit;

  contactLabels: Label[] = [];

  close = async (data?) => await this.modalController.dismiss(data);

  constructor(
    private modalController: ModalController,
    private addressBookService: AddressBookService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private platformService: PlatformService
  ) { }

  ngOnInit() {}

  async save(form){
    if(form.valid){
      this.addressBookService.updateLabelCounts(this.originalContact?.labels,this.contact.labels);
      if(this.edit){
        Object.assign(this.originalContact,this.contact);
      } else {
        this.addressBookService.contacts.push(this.contact);
      }
      this.addressBookService.filterContacts();

      await this.platformService.showToast(this.contact.name + ' saved!', 'secondary')
      await this.close();
    }
  }
  
  async delete(){
    await this.addressBookService.deleteContact(this.originalContact, this.close);
  }

  async cancel(form){
    if(form.pristine){
      await this.close();
    } else {
      const alert = await this.alertController.create({
        header: 'Cancel',
        message: 'Are you sure you want to <strong>cancel</strong> your changes?',
        buttons: [
          'Cancel',
          {
            text: 'Confirm',
            handler: async () => await this.close()
          }
        ]
      });
  
      await alert.present()
    }
  }

  removeLabel(label){
    pull(this.contactLabels,label);
    pull(this.contact.labels,label.id);
  }

  setContactLabels(){
    this.contactLabels = this.addressBookService.labels?.filter((label) => this.contact.labels?.includes(label.id)) || [];
  }

  async addLabel(event){
    if(!this.contact.labels){
      this.contact.labels = [];
    }
    const popover = await this.popoverController.create({
      component: SelectLabelComponent,
      cssClass: 'add-label-popover',
      componentProps: {selectedLabels: this.contact.labels},
      event: event,
    });

    popover.onWillDismiss().then( ({data: id}) =>{
      if(id){
        this.contact.labels.push(id);
        this.setContactLabels();
      }
    });

    return await popover.present();
  }

}
