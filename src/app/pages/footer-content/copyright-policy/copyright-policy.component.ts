import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-copyright-policy',
  templateUrl: './copyright-policy.component.html',
  styleUrls: ['./copyright-policy.component.css']
})
export class CopyrightPolicyComponent implements OnInit {


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
