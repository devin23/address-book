import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addresses: Address[] = [
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

  constructor() { }
}
