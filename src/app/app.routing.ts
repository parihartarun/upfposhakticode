import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { AuthGuardService } from './_helpers/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { FpoGuidelinesComponent } from './pages/fpo/fpo-guidelines/fpo-guidelines.component';

const routes: Routes =[
  {
    path: '', component: HomeComponent ,
   
  },
  {
    path: 'home', component: HomeComponent
  },
  { path: 'fpo_guidelines', component: FpoGuidelinesComponent },
  { path: 'schema', component: FpoGuidelinesComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ],
    canActivate:[AuthGuardService]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'home',
     pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
