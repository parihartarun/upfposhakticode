import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../pages/auth-pages/login/login.component';
import { HomeComponent } from '../../pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxCaptchaModule } from 'ngx-captcha';
import { FpoRegisterComponent } from '../../pages/registers/fpo-register/fpo-register.component';
import { FarmerRegisterComponent } from '../../pages/registers/farmer-register/farmer-register.component';
import { ByerSellRegisterComponent } from '../../pages/registers/byer-sell-register/byer-sell-register.component';
import { InputSupplierRegisterComponent } from '../../pages/registers/input-supplier-register/input-supplier-register.component';
import { RegisterComponent } from '../../pages/registers/register.component';
import { EquipmentCentreRegisterComponent } from '../../pages/registers/equipment-centre-register/equipment-centre-register.component';
import { FarmerChcRegisterComponent } from '../../pages/registers/farmer-chc-register/farmer-chc-register.component';
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
    RegisterComponent,
    FarmerRegisterComponent,    
    HomeComponent,    
    FpoRegisterComponent,
    ByerSellRegisterComponent,
    InputSupplierRegisterComponent,
    EquipmentCentreRegisterComponent,
    FarmerChcRegisterComponent, ForgotPasswordComponent
  ],
  providers: [
    { provide: BsDatepickerConfig },
  ]
})
export class AuthLayoutModule { }
