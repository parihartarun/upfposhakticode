import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 

@Injectable()
export class DataShowingService {
    dataShowingSubject = new Subject<any>();


    setSataShowingSubject(data) { 
        this.dataShowingSubject.next(data);
    }


}
