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
import { MenuComponent } from './components/menu/menu.component';
import { ImgLoaderComponent } from './components/img-loader/img-loader.component';
import { ViewTextComponent } from './components/view-text/view-text.component';

import { AddressBookService } from './services/address-book/address-book.service';
import { PlatformService } from './services/platfom/platform.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule  } from '@angular/material/sort';
import { MatMenuModule  } from '@angular/material/menu';
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
    MenuComponent,
    ImgLoaderComponent,
    ViewTextComponent,
    PhonePipe,
    MapLinkPipe],
  entryComponents: [EditContactComponent, ViewContactComponent, PhoneOptionsComponent, ViewTextComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatDividerModule,
    MatSortModule,
    MatMenuModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AddressBookService,
    PlatformService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
