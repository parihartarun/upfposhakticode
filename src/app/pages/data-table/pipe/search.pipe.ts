import { Pipe, PipeTransform } from '@angular/core';

import { DataShowingService } from '../services/data-showing.service';

@Pipe({
    name: 'search',
})
  
export class SearchPipe implements PipeTransform {
    constructor(private dataShowingService: DataShowingService) { }
    
    transform(array: any[], searchText: string): any {
        if (typeof array === 'undefined') {
            return;
        }
        if (typeof searchText === 'undefined' || Object.keys(searchText).length === 0 || searchText === '') {
            this.dataShowingService.setSataShowingSubject({len: array.length });
            return array;
        }
        const arr = array.filter((row) => {
            const rowDetail = JSON.stringify(Object.values(row));
            return  rowDetail.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1;
        });
        this.dataShowingService.setSataShowingSubject({len: arr.length});
        return arr;
    }
}