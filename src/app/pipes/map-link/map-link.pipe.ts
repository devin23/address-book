import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapLink'
})
export class MapLinkPipe implements PipeTransform {

  transform(address): string {
    if(address === null){
      return '';
    }

    let addressString = address.replace(' ', '+');

    return `https://www.google.com/maps/place/${addressString}`;
  }

}
