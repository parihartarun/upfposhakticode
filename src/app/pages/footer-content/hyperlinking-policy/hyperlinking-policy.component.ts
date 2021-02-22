import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hyperlinking-policy',
  templateUrl: './hyperlinking-policy.component.html',
  styleUrls: ['./hyperlinking-policy.component.css']
})
export class HyperlinkingPolicyComponent implements OnInit {

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
