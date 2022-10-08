import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cap',
})
export class CaptilizePipe implements PipeTransform {
  transform(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
