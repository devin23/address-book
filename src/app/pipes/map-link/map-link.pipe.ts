import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'mapLink'
})
export class MapLinkPipe implements PipeTransform {

  transform(address): string {
    if(isNil(address)){
      return '';
    }

    let addressString = address.replace(' ', '+');

    return `https://www.google.com/maps/place/${addressString}`;
  }

}
