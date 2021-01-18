import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from '../../pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FarmerRegisterComponent } from '../../pages/farmer-register/farmer-register.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),

    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    FarmerRegisterComponent,    
    HomeComponent,
    ProductsListComponent
  ],
  providers: [
    { provide: BsDatepickerConfig },
  ]
})
export class AuthLayoutModule { }
