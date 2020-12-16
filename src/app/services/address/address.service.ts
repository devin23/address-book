import { Injectable } from '@angular/core';
import { address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addresses: address[] = [
    {name: 'person 1', address: '' , phone: 1234567890, email: ''},
    {name: 'person 2', address: '' , phone: 2234567890, email: ''},
    {name: 'person 3', address: '' , phone: 3234567890, email: ''},
    {name: 'person 4', address: '' , phone: 4234567890, email: ''},
  ]

  constructor() { }
}
