import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableSearch'
})
export class TableSearchPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      let rVal = (val.id.toString()?.toLocaleLowerCase().includes(args)) || (val.description?.toLocaleLowerCase().includes(args));
      return rVal;
    });
  }

}
