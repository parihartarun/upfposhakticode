import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

import { BoardMembersComponent } from '../../pages/fpo/board-members/board-members.component';
import { LicenseComponent } from '../../pages/fpo/license/license.component';
import { MachinaryBankComponent } from '../../pages/fpo/machinary-bank/machinary-bank.component';
import { StorageUnitComponent } from '../../pages/fpo/storage-unit/storage-unit.component';
import { CropProductionComponent } from '../../pages/fpo/crop-production/crop-production.component';
import { SalesDetailsComponent } from '../../pages/fpo/sales-details/sales-details.component';
import { ProductionReportComponent } from '../../pages/fpo/production-report/production-report.component';
import { PhotographsComponent } from '../../pages/fpo/photographs/photographs.component';
import { FarmerDetailsComponent } from '../../pages/fpo/farmer-details/farmer-details.component';
import { LandDetailsComponent } from '../../pages/fpo/land-details/land-details.component';
import { AddFarmerComponent } from '../../pages/fpo/add-farmer/add-farmer.component';
import { ProductionDetailsComponent } from '../../pages/fpo/production-details/production-details.component';
import { CropShowingDetailsComponent } from '../../pages/fpo/crop-showing-details/crop-showing-details.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
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
    CropShowingDetailsComponent
  ]
})

export class AdminLayoutModule {}
