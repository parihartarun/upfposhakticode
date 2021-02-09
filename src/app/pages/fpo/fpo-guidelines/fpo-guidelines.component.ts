import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private api: FpoService,) {
    this.baseUrl = environment.baseUrl;
  }


  ngOnInit(): void {
    
    this.fpoGuideLineFrom = this.formBuilder.group({
      isPostRegistration: ['isPerRegistration']     
     
    });
    this.api.getFPOGuideLinePreRegistration().subscribe(fg => {
      this.fpoGuideLines=fg
    })

  }
  
  isProPostRegistration(isPerRegistration: any) {
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
