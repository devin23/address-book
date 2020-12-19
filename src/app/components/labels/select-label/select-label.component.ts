import { Component, OnInit, Input } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Label } from 'src/app/models/label.model';
import { PopoverController } from '@ionic/angular';

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
  noLabels: boolean;

  constructor(private addressBookService: AddressBookService, public popoverController: PopoverController) { }

  ngOnInit() {}

  async openManageLabels(){
    await this.addressBookService.openManageLabels();

    this.setFilteredLabels();
  }

  setFilteredLabels(){
    if(this.selectedLabelValue && this.selectedLabelValue.length){
      this.filteredLabels = this.addressBookService.labels.filter((label) => !this.selectedLabelValue.includes(label.id));
    } else {
      this.filteredLabels = this.addressBookService.labels;
    }
    
    this.noLabels = !this.addressBookService.labels.length;
  }

}
