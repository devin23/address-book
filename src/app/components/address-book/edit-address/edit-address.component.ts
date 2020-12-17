import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss'],
})
export class EditAddressComponent implements OnInit {

  @Input() set address(val:Address){
    console.log(val);
  }

  constructor() { }

  ngOnInit() {}

}
