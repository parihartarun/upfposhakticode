import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { DepartmentDashboardComponent } from '../../pages/department/dashboard/departmentDashboard.component';
import { DepartmentUserManagementComponent } from '../../pages/department/department-user-management/department-user-management.component';

import { DepartmentUplaodCircularComponent } from '../../pages/department/department-uplaod-circular/department-uplaod-circular.component';
import { DepartmentReportComponent } from '../../pages/department/department-report/department-report.component';
import { DepartmentCircularsComponent } from '../../pages/department/department-circulars/department-circulars.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    NgxChartsModule,
    ChartsModule
  ],
  declarations: [

    DepartmentDashboardComponent,
    DepartmentCircularsComponent,
    DepartmentReportComponent ,  
    DepartmentUplaodCircularComponent,
    DepartmentUserManagementComponent,
  ]
})

export class AdminLayoutModule {}
