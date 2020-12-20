import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { cloneDeep, pull } from 'lodash';
import { Label } from 'src/app/models/label.model';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';

@Component({
  selector: 'app-manage-labels',
  templateUrl: './manage-labels.component.html',
  styleUrls: ['./manage-labels.component.scss'],
})
export class ManageLabelsComponent implements OnInit {

  @ViewChildren('labelInput') items:QueryList<any>;

  labels:Label[] = [];
  deletedLabelIds: number[] = [];

  constructor(private modalController: ModalController, private alertController: AlertController, private addressBookService: AddressBookService) { }

  ngOnInit() {
    this.labels = cloneDeep(this.addressBookService.labels);

    if(!this.labels.length){
      this.add(500);
    }
  }

  async close(){
    await this.modalController.dismiss();
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

  delete(label){
    pull(this.labels,label);
    this.deletedLabelIds.push(label.id);
  }
  
  add(timeout = 250){
    this.labels.push({
      title: '',
      id: Math.round(Math.random() * 100000000),
      count: 0,
    });

    setTimeout(() => {
      this.items.last.setFocus();
    },timeout)
  }

  async save(form){
    if(form.valid){
      this.addressBookService.updateLabels(this.labels, this.deletedLabelIds);

      await this.close();
    } else {
      form.control.markAllAsTouched();
    }
  }

}
