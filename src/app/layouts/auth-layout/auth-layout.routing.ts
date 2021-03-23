import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth-pages/login/login.component';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { ByerSellRegisterComponent } from '../../pages/registers/byer-sell-register/byer-sell-register.component';
import { InputSupplierRegisterComponent } from '../../pages/registers/input-supplier-register/input-supplier-register.component';
import { FarmerRegisterComponent } from '../../pages/registers/farmer-register/farmer-register.component';
import { FpoRegisterComponent } from '../../pages/registers/fpo-register/fpo-register.component';
import { RegisterComponent } from '../../pages/registers/register.component';
import { FpoDetailsComponent } from '../../pages/fpo-details/fpo-details.component';
import { FpoGuidelinesComponent } from '../../pages/fpo/fpo-guidelines/fpo-guidelines.component';
import { SchemasComponent } from 'src/app/pages/schemas/schemas.component';
import { ForgotPasswordComponent } from 'src/app/pages/auth-pages/forgot-password/forgot-password.component';
import {PageUnderConstructionComponent} from 'src/app/pages/page-under-construction/page-under-construction.component';
import { SupplierDetailsComponent } from '../../pages/main-pages/user-profiles/supplier-details/supplier-details.component';
import { ChcfmbDetailsComponent } from '../../pages/main-pages/user-profiles/chcfmb-details/chcfmb-details.component';
import {ViewAllNotificationsComponent} from '../../pages/view-all-notifications/view-all-notifications.component';

export const AuthLayoutRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'fpo-details/:id', component: FpoDetailsComponent },
  { path: 'supplier-details/:id', component: SupplierDetailsComponent },
  { path: 'chcfmb-details/:id', component: ChcfmbDetailsComponent },
  { path: 'maintenance',component: PageUnderConstructionComponent},
  { path: 'register', component: RegisterComponent },
  //{ path: 'home', component: HomeDummyComponent },
  { path: 'products/:val/:searchType', component: ProductsListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'farmer-register', component: FarmerRegisterComponent },
  { path: 'fpo-register', component: FpoRegisterComponent },
  { path: 'bye-seller-register', component: ByerSellRegisterComponent },
  { path: 'input-suppler-register', component: InputSupplierRegisterComponent },
  { path: 'schema', component: SchemasComponent },
  { path: 'fpo_guidelines', component: FpoGuidelinesComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'view',component:ViewAllNotificationsComponent}
];
