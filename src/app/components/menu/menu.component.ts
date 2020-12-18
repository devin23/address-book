import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public addressBookService: AddressBookService, private menuController: MenuController) { }

  ngOnInit() {}

  filterContacts(type,isLabel){
    this.addressBookService.filterContacts(type,isLabel);
    this.menuController.close();
  }

}
