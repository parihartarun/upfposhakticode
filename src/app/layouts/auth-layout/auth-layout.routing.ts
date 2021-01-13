import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeDummyComponent } from '../../pages/home-dummy/home-dummy.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login',          component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home1', component: HomeDummyComponent },
];
