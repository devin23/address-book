import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address/address.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address', 'email', 'phone'];

  constructor(public addressService: AddressService) { }

  ngOnInit() {}

}
