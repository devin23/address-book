import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { Contact } from '../../models/contact.model';
import { PlatformService } from 'src/app/services/platfom/platform.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ViewTextComponent } from '../view-text/view-text.component';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  columns = [
    {
      columnDef: 'image',
      minVisibleWidth: 0,
    },{
      columnDef: 'name',
      minVisibleWidth: 0,
    },{
      columnDef: 'address',
      minVisibleWidth: 500,
    },{
      columnDef: 'email',
      minVisibleWidth: 650,
    },{
      columnDef: 'phone',
      minVisibleWidth: 750,
    },{
      columnDef: 'note',
      minVisibleWidth: 800,
    },
  ];
  displayedColumns: string[];
  dataSource = new MatTableDataSource(this.addressBookService.contacts);
  filterText;

  constructor(
    public addressBookService: AddressBookService, 
    private modalController: ModalController, 
    public platformService: PlatformService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.setDisplayColumns();
    window.onresize = () => this.setDisplayColumns();
  }
  
  ngAfterViewInit() {
    this.addressBookService.filterContacts$.subscribe(data => this.dataSource.data = data);

    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data,filter) => {
      if(filter){
        return this.displayedColumns.some( column => data[column]?.toString().toLowerCase().indexOf(filter) >= 0);
      } else {
        return true
      }
    }
  }

  applyFilter(){
    this.dataSource.filter = this.filterText?.toLowerCase();
  }

  setDisplayColumns() {
    const windowWidth = window.innerWidth;
    this.displayedColumns = this.columns
      .filter((column) => column.minVisibleWidth < windowWidth)
      .map((column) => column.columnDef);
  }

  async createContact(){
    const modal = await this.modalController.create({
      component: EditContactComponent,
      componentProps: {
        favorites: this.addressBookService.selectedFilterType === 'favorites',
        label: this.addressBookService.selectedLabel
      },
      cssClass: this.platformService.isSmallScreen() ? '' : 'edit-contact-modal',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  async viewContact(contact: Contact){
    const modal = await this.modalController.create({
      component: ViewContactComponent,
      cssClass: this.platformService.isSmallScreen() ? '' : 'view-contact-modal',
      componentProps:{contact: contact},
    });

    return await modal.present();
  }

  stopProp(event){
    event.stopPropagation();
  }

  async showContactNote(note,event){
    if(note){
      this.stopProp(event);

      const popover = await this.popoverController.create({
        component: ViewTextComponent,
        cssClass: 'view-text-popover',
        componentProps: {text: note},
        event: event,
      });
      return await popover.present();
    }
  }

}
