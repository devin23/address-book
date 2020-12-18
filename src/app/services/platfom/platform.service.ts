import { Injectable } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { PhoneOptionsComponent } from 'src/app/components/phone-options/phone-options.component';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  isMobileDevice;

  constructor(private platform:Platform, private popoverController: PopoverController) {
    this.isMobileDevice = 
      !this.platform.is('desktop') 
      && !this.platform.is('tablet') 
      && (this.platform.is('iphone') 
        || this.platform.is('android'));
  }

  isSmallScreen(){
    return Math.min(window.innerWidth, window.innerHeight) < 500;
  }

  async openPhoneOptions(contact: Contact, event: Event){
    event.stopPropagation();

    const popover = await this.popoverController.create({
      component: PhoneOptionsComponent,
      cssClass: 'phone-options-popover',
      componentProps: {contact: contact},
      event: event,
    });
    return await popover.present();
  }
}
