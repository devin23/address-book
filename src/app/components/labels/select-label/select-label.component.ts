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
    this.filteredLabels = this.addressBookService.labels.filter((label) => !val.includes(label.id));
  }
  filteredLabels: Label[] = [];

  constructor(private addressBookService: AddressBookService, public popoverController: PopoverController) { }

  ngOnInit() {}

}
