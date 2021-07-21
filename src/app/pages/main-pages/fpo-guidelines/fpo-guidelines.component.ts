import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { LanguageService } from 'src/app/_services/language.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fpo-guidelines',
  templateUrl: './fpo-guidelines.component.html',
  styleUrls: ['./fpo-guidelines.component.css']
})
export class FpoGuidelinesComponent implements OnInit,OnChanges, OnDestroy {
  subscription: Subscription;
  fpoGuideLines: any = [];
  p: number = 1;
  baseUrl: string;
  fpoGuideLineFrom: FormGroup;
  isPost = false;
  isOpen = false;
  isLoggeIn = false;
  username = '';
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };
  fpohindi: any;
  Englishlang :boolean = true;

  constructor(private formBuilder: FormBuilder, private api: FpoService, public translate: TranslateService, private languageService: LanguageService) {
    this.baseUrl = environment.baseUrl;
    // console.log(localStorage.getItem('language'));
    // if (localStorage.getItem('language') == 'hi') {
    //   this.Englishlang = false;
    // }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
    this.fpoGuideLineFrom = this.formBuilder.group({
      isPostRegistration: ['isPerRegistration']

    });

    this.getLangChange();
}

ngOnChanges(){
  console.log(localStorage.getItem('language'));
}



  useLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.toggleNavbar();
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  isProPostRegistration() {
    let lang = localStorage.getItem('language');
    this.getFPOGuideLine(lang);
  }

  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }

  getLangChange(){
   this.subscription = this.languageService.getLanguage().subscribe(language=> {
      this.Englishlang =  (language == 'en') ? true : false;
      this.getFPOGuideLine(language)
    })
  }

  getFPOGuideLine(language){
    if (this.fpoGuideLineFrom.controls['isPostRegistration'].value === "isPostRegistration") {
      // this.fpoGuideLineFrom.controls['isPostRegistration'].setValue('isPostRegistration');
      this.isPost = true;
      this.api.getFPOGuideLinePostRegistration(language).subscribe(response => {
        this.fpoGuideLines = response
      })
    } else {
      // this.fpoGuideLineFrom.controls['isPostRegistration'].setValue('isPerRegistration');
      this.isPost = false;
      this.api.getFPOGuideLinePreRegistration(language).subscribe(response => {
        this.fpoGuideLines = response
      })
    }
  }
}
