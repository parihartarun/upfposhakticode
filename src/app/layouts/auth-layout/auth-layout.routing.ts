import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth-pages/login/login.component';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeDummyComponent } from '../../pages/home-dummy/home-dummy.component';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { ByerSellRegisterComponent } from '../../pages/registers/byer-sell-register/byer-sell-register.component';
import { InputSupplierRegisterComponent } from '../../pages/registers/input-supplier-register/input-supplier-register.component';
import { FarmerRegisterComponent } from '../../pages/registers/farmer-register/farmer-register.component';
import { FpoRegisterComponent } from '../../pages/registers/fpo-register/fpo-register.component';
import { RegisterComponent } from '../../pages/registers/register.component';
import { FpoDetailsComponent } from '../../pages/fpo-details/fpo-details.component';

export const AuthLayoutRoutes: Routes = [
   
    { path: 'login', component: LoginComponent },
    { path: 'fpo-details/:id', component: FpoDetailsComponent },
    
    { path: 'register', component: RegisterComponent },
    //{ path: 'home', component: HomeDummyComponent },
    { path: 'products/:val/:searchType', component: ProductsListComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'farmer-register', component: FarmerRegisterComponent },
    { path: 'fpo-register', component: FpoRegisterComponent },
    { path: 'bye-seller-register', component: ByerSellRegisterComponent },
    { path: 'input-suppler-register', component: InputSupplierRegisterComponent },
];
