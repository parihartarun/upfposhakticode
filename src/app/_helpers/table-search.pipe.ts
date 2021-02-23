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
      let rVal = (val.id?.toString().toLocaleLowerCase().includes(args)) 
      || (val.description?.toLocaleLowerCase().includes(args))

      || (val.farmer_name?.toLocaleLowerCase().includes(args))
      || (val.father_husband_name?.toLocaleLowerCase().includes(args))
      || (val.season_name?.toLocaleLowerCase().includes(args))
      || (val.crop_name?.toLocaleLowerCase().includes(args))
      || (val.crop_veriety?.toLocaleLowerCase().includes(args))
      || (val.sowing_area?.toString().toLocaleLowerCase().includes(args))
      || (val.ex_yield?.toString().toLocaleLowerCase().includes(args))
      || (val.actual_yield?.toString().toLocaleLowerCase().includes(args))
      || (val.marketable_quantity?.toString().toLocaleLowerCase().includes(args)
      
      );
      return rVal;
    });
  }

}
