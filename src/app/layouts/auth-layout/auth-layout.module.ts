import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
    NgxCaptchaModule,
    NgbModule
  ],
  declarations: [
    
    
  ],
  providers: [
    { provide: BsDatepickerConfig },
  ]
})
export class AuthLayoutModule { }
