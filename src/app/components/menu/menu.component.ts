import { Component, OnInit } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ManageLabelsComponent } from '../labels/manage-labels/manage-labels.component';
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

  async manageLabels(){
    const modal = await this.modalController.create({
      component: ManageLabelsComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'modal-size',
      backdropDismiss: false,
    });

    return await modal.present();
  }

  async showAboutInfo(){
    const modal = await this.modalController.create({
      component: AboutComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'about-modal-size',
    });

    return await modal.present();
  }

}
