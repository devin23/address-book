import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../models/address';
import { ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {

  @Input() set address(val:Address){
    if(val){
      this.edit = true;
      this.originalAddress = val;
      this._address = cloneDeep(val);
    }
  }
  get address(){
    return this._address;
  }
  _address:Address = {};
  originalAddress;
  edit;

  close = async () => await this.modalController.dismiss();

  constructor(private modalController: ModalController, private addressService: AddressService) { }

  ngOnInit() {}

  async save(form){
    if(form.valid){
      if(this.edit){
        Object.assign(this.originalAddress,this.address);
      } else {
        this.addressService.addresses.push(this.address);
      }
      this.addressService.sortAddresses();
      await this.close();
    }
  }
}
