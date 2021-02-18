import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent implements OnInit {

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
