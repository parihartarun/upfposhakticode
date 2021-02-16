import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
    pure: true //default pure = true
})
  
export class SortPipe implements PipeTransform {

    transform(array: any[], filter: { order: string, key: string }): any {
        // console.log("sort pipe" + JSON.stringify(filter));
        // console.log(array);
        if (!filter.key || filter.key === '') {
            return array;
        }
        if (filter.order === '') {
            return array;
        }
        if (filter.order === 'asc') {
            return array.sort((a, b) => this.compare(a, b, filter.key));
        } else {
            return array.sort((a, b) => this.compare(b, a, filter.key));
        }

    }

    private compare(a: any, b: any, key: string): number {
        //return ('' + a[key]).localeCompare(b[key]);
        //console.log(this.isNaN(a, b));
        if (this.isNaN(a[key], b[key])) {
            return (''+a[key]).localeCompare(b[key]);
        } else {
            if (parseFloat(a[key]) < parseFloat(b[key])) {
              return -1;
            }
            if (parseFloat(a[key]) > parseFloat(b[key])) {
              return 1;
            }
        }
        return 0;
    }
    private  isNaN(aV: any, bV: any): boolean {
        return (isNaN(parseFloat(aV)) || !isFinite(aV)) || (isNaN(parseFloat(bV)) || !isFinite(bV));
    }
}