import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';


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
import { ComplaintsComponent } from '../../pages/fpo/complaints/complaints.component';
import { ServicesComponent } from '../../pages/fpo/services/services.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'board-members',   component: BoardMembersComponent },
    { path: 'license',   component: LicenseComponent },
    { path: 'machinary-bank',component: MachinaryBankComponent },
    { path: 'storage-unit',   component: StorageUnitComponent },
    { path: 'crop-production',   component: CropProductionComponent },
    { path: 'sales-details',   component: SalesDetailsComponent },
    { path: 'production-report',   component: ProductionReportComponent },
    { path: 'photographs',   component: PhotographsComponent },
    { path: 'farmer-details',   component: FarmerDetailsComponent },
    { path: 'land-details',   component: LandDetailsComponent },
    { path: 'add-farmer',   component: AddFarmerComponent },
    { path: 'production-details',   component: ProductionDetailsComponent },
    { path: 'crop-showing-details',   component: CropShowingDetailsComponent},
    { path: 'services',   component: ServicesComponent},
    { path: 'complaints',   component: ComplaintsComponent},
];
