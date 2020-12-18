import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { EditContactComponent } from './components/address-book/edit-contact/edit-contact.component';
import { ViewContactComponent } from './components/address-book/view-contact/view-contact.component';
import { PhoneOptionsComponent } from './components/phone-options/phone-options.component';
import { AddressBookService } from './services/address-book/address-book.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { PhonePipe } from './pipes/phone/phone.pipe';
import { MapLinkPipe } from './pipes/map-link/map-link.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    EditContactComponent,
    ViewContactComponent,
    PhoneOptionsComponent,
    PhonePipe,
    MapLinkPipe],
  entryComponents: [EditContactComponent, ViewContactComponent, PhoneOptionsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AddressBookService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
