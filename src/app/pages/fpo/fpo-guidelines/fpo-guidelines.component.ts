import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { FpoService } from '../../../_services/fpo/fpo.service';

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
  constructor(private formBuilder: FormBuilder, private api: FpoService, public translate: TranslateService) {
    this.baseUrl = environment.baseUrl;
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('hi');
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
      this.isPost = true;
      this.api.getFPOGuideLinePreRegistration().subscribe(fg => {
        this.fpoGuideLines = fg
      })
    }
    
   
  }
}
