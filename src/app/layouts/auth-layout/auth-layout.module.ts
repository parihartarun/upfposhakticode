import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/auth-pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from '../../pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FarmerRegisterComponent } from '../../pages/farmer-register/farmer-register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FpoRegisterComponent } from '../../pages/fpo-register/fpo-register.component';
import { ForgotPasswordComponent } from '../../pages/auth-pages/forgot-password/forgot-password.component';

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
    LoginComponent,
    RegisterComponent,
    FarmerRegisterComponent,    
    HomeComponent,
    ProductsListComponent,
    FpoRegisterComponent,
    ForgotPasswordComponent
  ],
  providers: [
    { provide: BsDatepickerConfig },
  ]
})
export class AuthLayoutModule { }
