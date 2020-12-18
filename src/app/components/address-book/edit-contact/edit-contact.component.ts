import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ModalController, AlertController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {

  @Input() set contact(val:Contact){
    if(val){
      this.edit = true;
      this.originalContact = val;
      this._contact = cloneDeep(val);
    }
  }
  get contact(){
    return this._contact;
  }
  _contact:Contact = {};
  originalContact;
  edit;

  close = async (data?) => await this.modalController.dismiss(data);

  constructor(private modalController: ModalController, private addressBookService: AddressBookService, private alertController: AlertController) { }

  ngOnInit() {}

  async save(form){
    if(form.valid){
      if(this.edit){
        Object.assign(this.originalContact,this.contact);
      } else {
        this.addressBookService.contacts.push(this.contact);
      }
      this.addressBookService.filterContacts();
      await this.close();
    }
  }
  
  async delete(){
    await this.addressBookService.delete(this.originalContact, this.close);
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
}
