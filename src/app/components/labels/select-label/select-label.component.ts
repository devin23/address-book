import { Component, OnInit, Input } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Label } from 'src/app/models/label.model';
import { PopoverController, ModalController } from '@ionic/angular';
import { ManageLabelsComponent } from '../manage-labels/manage-labels.component';
import { PlatformService } from 'src/app/services/platfom/platform.service';

@Component({
  selector: 'app-select-label',
  templateUrl: './select-label.component.html',
  styleUrls: ['./select-label.component.scss'],
})
export class SelectLabelComponent implements OnInit {

  @Input() set selectedLabels (val: number[]){
    this.selectedLabelValue = val;
    this.setFilteredLabels();
  }
  selectedLabelValue: number[];
  filteredLabels: Label[] = [];

  constructor(
    private addressBookService: AddressBookService,
    public popoverController: PopoverController,
    private modalController: ModalController,
    private platformService: PlatformService,
  ) { }

  ngOnInit() {}

  async openManageLabels(){
    const modal = await this.modalController.create({
      component: ManageLabelsComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'manage-labels-modal',
      backdropDismiss: false,
    });

    await modal.present();

    await modal.onWillDismiss();

    this.setFilteredLabels();
  }

  setFilteredLabels(){
    if(this.selectedLabelValue && this.selectedLabelValue.length){
      this.filteredLabels = this.addressBookService.labels.filter((label) => !this.selectedLabelValue.includes(label.id));
    } else {
      this.filteredLabels = this.addressBookService.labels;
    }
  }

}
