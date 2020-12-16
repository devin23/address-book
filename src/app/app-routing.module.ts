import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './components/address-book/address-book.component';

const routes: Routes = [
  {
    path: 'address-list',
    component: AddressBookComponent
  },
  {
    path: '',
    redirectTo: 'address-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
