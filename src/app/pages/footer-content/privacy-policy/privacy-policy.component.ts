import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

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
