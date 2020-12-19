import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { MenuController, ModalController } from '@ionic/angular';
import { PlatformService } from 'src/app/services/platfom/platform.service';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    public addressBookService: AddressBookService,
    private menuController: MenuController,
    private platformService: PlatformService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  filterContacts(type,isLabel?){
    this.addressBookService.filterContacts(type,isLabel);
    this.menuController.close();
  }

  async showAboutInfo(){
    const modal = await this.modalController.create({
      component: AboutComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'about-modal',
    });

    return await modal.present();
  }

}
