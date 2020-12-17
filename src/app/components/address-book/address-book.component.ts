import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address/address.service';
import {PhonePipe} from '../../pipes/phone.pipe';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {

  columns = [
    {
      title: 'Name',
      attr: 'name',
      minVisibleWidth: 0,
    },{
      title: 'Address',
      attr: 'address',
      minVisibleWidth: 400,
    },{
      title: 'Email',
      attr: 'email',
      minVisibleWidth: 600,
    },{
      title: 'Phone',
      attr: 'phone',
      minVisibleWidth: 800,
      pipe: new PhonePipe(),
    },
  ];
  displayedColumns: string[];

  constructor(public addressService: AddressService) { }

  ngOnInit() {
    this.setDisplayColumns();
    window.onresize = () => this.setDisplayColumns();
  }

  setDisplayColumns() {
    const windowWidth = window.innerWidth;
    this.displayedColumns = this.columns
      .filter((column) => column.minVisibleWidth < windowWidth)
      .map((column) => column.title);
  }



}
