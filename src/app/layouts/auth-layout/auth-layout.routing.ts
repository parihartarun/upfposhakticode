import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeDummyComponent } from '../../pages/home-dummy/home-dummy.component';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { FarmerRegisterComponent } from '../../pages/farmer-register/farmer-register.component';
import { FpoRegisterComponent } from '../../pages/fpo-register/fpo-register.component';
import { ByerSellRegisterComponent } from '../../pages/byer-sell-register/byer-sell-register.component';
import { InputSupplierRegisterComponent } from '../../pages/input-supplier-register/input-supplier-register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'home-old', component: HomeComponent },
    { path: 'login',          component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeDummyComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'farmer-register', component: FarmerRegisterComponent },
  { path: 'fpo-register', component: FpoRegisterComponent },
  { path: 'bye-seller-register', component: ByerSellRegisterComponent },
  { path: 'input-suppler-register', component: InputSupplierRegisterComponent },
];
