import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GetTranslationService {
  data = '';
  constructor(public translate: TranslateService) { }
  getTranslatedData(input) {
    let promise = new Promise((resolve, reject) => {
      this.translate.get(input).subscribe(res => {
        console.log('res', res);
        resolve(res);
      });
    });
    return promise;


  }
}
