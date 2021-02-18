import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

 
  constructor(public translate: TranslateService) { }
  lang = '';
  ngOnInit(): void {
    this.lang = localStorage.getItem('language');
    this.translate.onLangChange.subscribe(res => {
      if (res) {
        this.lang = res.lang;
      }
    })
  }

}
