import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fpo-guidelines',
  templateUrl: './fpo-guidelines.component.html',
  styleUrls: ['./fpo-guidelines.component.css']
})
export class FpoGuidelinesComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private api: FpoService, public translate: TranslateService) {
    this.baseUrl = environment.baseUrl;
    if(localStorage.getItem('language')){
      translate.setDefaultLang(localStorage.getItem('language'));
    }else{
      translate.setDefaultLang('hi');
      localStorage.setItem('language', 'hi');
    }
  }


  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
    this.fpoGuideLineFrom = this.formBuilder.group({
      isPostRegistration: ['isPerRegistration']     
     
    });
    this.api.getFPOGuideLinePreRegistration().subscribe(fg => {
      this.fpoGuideLines=fg
    })

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
    if (this.fpoGuideLineFrom.controls['isPostRegistration'].value === "isPostRegistration") {
      this.fpoGuideLineFrom.controls['isPostRegistration'].setValue('isPostRegistration');
      this.isPost = true;
      this.api.getFPOGuideLinePostRegistration().subscribe(fg => {
        this.fpoGuideLines = fg
      })
    } else {
      this.fpoGuideLineFrom.controls['isPostRegistration'].setValue('isPerRegistration');
      this.isPost = false;
      this.api.getFPOGuideLinePreRegistration().subscribe(fg => {
        this.fpoGuideLines = fg
      })
    }
    
   
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
}
