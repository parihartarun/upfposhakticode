import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxLoadingModule } from 'ngx-loading';
import { ErrorInterceptor } from './_helpers/error.interceptor'
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AuthGuardService } from './_helpers/auth-guard.service';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { HomeDummyComponent } from './pages/home-dummy/home-dummy.component';
import { LoginComponent } from './pages/auth-pages/login/login.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FpoDetailsComponent } from './pages/fpo-details/fpo-details.component';
import { AuthHeaderComponent } from './components/auth/auth-header/auth-header.component';
import { HomeComponent } from './pages/home/home.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { BoardMembersComponent } from './pages/fpo/board-members/board-members.component';
import { LicenseComponent } from './pages/fpo/license/license.component';
import { MachinaryBankComponent } from './pages/fpo/machinary-bank/machinary-bank.component';
import { StorageUnitComponent } from './pages/fpo/storage-unit/storage-unit.component';
import { CropProductionComponent } from './pages/fpo/crop-production/crop-production.component';
import { SalesDetailsComponent } from './pages/fpo/sales-details/sales-details.component';
import { ProductionReportComponent } from './pages/fpo/production-report/production-report.component';
import { PhotographsComponent } from './pages/fpo/photographs/photographs.component';
import { FarmerDetailsComponent } from './pages/fpo/farmer-details/farmer-details.component';
import { LandDetailsComponent } from './pages/fpo/land-details/land-details.component';
import { AddFarmerComponent } from './pages/fpo/add-farmer/add-farmer.component';
import { ProductionDetailsComponent } from './pages/fpo/production-details/production-details.component';
import { CropShowingDetailsComponent } from './pages/fpo/crop-showing-details/crop-showing-details.component';
import { ComplaintsComponent } from './pages/fpo/complaints/complaints.component';
import { ServicesComponent } from './pages/fpo/services/services.component';
import { RegisterComponent } from './pages/registers/register.component';
import { FarmerRegisterComponent } from './pages/registers/farmer-register/farmer-register.component';
import { FpoRegisterComponent } from './pages/registers/fpo-register/fpo-register.component';
import { ByerSellRegisterComponent } from './pages/registers/byer-sell-register/byer-sell-register.component';
import { InputSupplierRegisterComponent } from './pages/registers/input-supplier-register/input-supplier-register.component';
import { EquipmentCentreRegisterComponent } from './pages/registers/equipment-centre-register/equipment-centre-register.component';
import { FarmerChcRegisterComponent } from './pages/registers/farmer-chc-register/farmer-chc-register.component';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SearchComponent } from './pages/common/search/search.component';
import { NotificationsComponent } from './pages/common/notifications/notifications.component';
import { IndentComponent } from './pages/common/indent/indent.component';
import { LoginModelPopupComponent } from './pages/common/login-model-popup/login-model-popup.component';
import { OnlynumberDirective } from './directive/onlynumber.directive';
import { NgMarqueeModule } from 'ng-marquee';
import { FpoGuidelinesComponent } from './pages/fpo/fpo-guidelines/fpo-guidelines.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CarouselModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    NgMarqueeModule,
    ToastrModule.forRoot({
      timeOut: 10000,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ProductsListComponent,
    HomeDummyComponent,
    LoginComponent,
    FpoDetailsComponent,
    AuthHeaderComponent,
    HomeComponent,    
   
    ForgotPasswordComponent,
    DashboardComponent,
    BoardMembersComponent,
    LicenseComponent,
    MachinaryBankComponent,
    StorageUnitComponent,
    CropProductionComponent,
    SalesDetailsComponent,
    ProductionReportComponent,
    PhotographsComponent,
    FarmerDetailsComponent,
    LandDetailsComponent,
    AddFarmerComponent,
    ProductionDetailsComponent,
    CropShowingDetailsComponent,
    ComplaintsComponent,
    ServicesComponent,
    RegisterComponent,
    FarmerRegisterComponent,

    FpoRegisterComponent,
    ByerSellRegisterComponent,
    InputSupplierRegisterComponent,
    EquipmentCentreRegisterComponent,
    FarmerChcRegisterComponent,
    UserProfileComponent,
    SearchComponent,
    NotificationsComponent,
    IndentComponent,
    LoginModelPopupComponent,
    OnlynumberDirective,
    FpoGuidelinesComponent
  ],
  exports: [   
    AuthHeaderComponent
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
