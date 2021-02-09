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
import { DepartmentDashboardComponent } from '../../pages/department/dashboard/departmentDashboard.component';
import { DepartmentReportComponent } from '../../pages/department/department-report/department-report.component';
import { DepartmentProductionReportComponent } from '../../pages/department/department-production-report/department-production-report.component';
import { DepartmentSalesReportComponent } from '../../pages/department/department-sales-report/department-sales-report.component';
import { DepartmentCircularsComponent } from '../../pages/department/department-circulars/department-circulars.component';
import { DepartmentUplaodCircularComponent } from '../../pages/department/department-uplaod-circular/department-uplaod-circular.component';
import { DepartmentComplaintsComponent } from '../../pages/department/department-complaints/department-complaints.component';
import { DepartmentUserManagementComponent } from '../../pages/department/department-user-management/department-user-management.component';
import { DepartmentAllUsersComponent } from '../../pages/department/department-all-users/department-all-users.component';
import { SearchComponent } from '../..//pages/common/search/search.component';
import { NotificationsComponent } from '../../pages/common/notifications/notifications.component';
import { IndentComponent } from '../../pages/common/indent/indent.component';
import { FarmerUserProfileComponent } from '../../pages/user-profile/farmer-user-profile/farmer-user-profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'fpo/dashboard', component: DashboardComponent },
  { path: 'fpo/user-profile', component: UserProfileComponent },
  { path: 'fpo/board-members', component: BoardMembersComponent },
  { path: 'fpo/license', component: LicenseComponent },
  { path: 'fpo/machinary-bank', component: MachinaryBankComponent },
  { path: 'fpo/storage-unit', component: StorageUnitComponent },
  { path: 'fpo/crop-production', component: CropProductionComponent },
  { path: 'fpo/sales-details', component: SalesDetailsComponent },
  { path: 'fpo/production-report', component: ProductionReportComponent },
  { path: 'fpo/photographs', component: PhotographsComponent },
  { path: 'fpo/farmer-details', component: FarmerDetailsComponent },
  { path: 'fpo/land-details', component: LandDetailsComponent },
  { path: 'fpo/add-farmer', component: AddFarmerComponent },
  { path: 'fpo/production-details', component: ProductionDetailsComponent },
  { path: 'fpo/crop-showing-details', component: CropShowingDetailsComponent },
  { path: 'fpo/services', component: ServicesComponent },
  { path: 'fpo/complaints', component: ComplaintsComponent },
  { path: 'department/dashboard', component: DepartmentDashboardComponent },
  { path: 'department/reports', component: DepartmentReportComponent },
  { path: 'department/production-report', component: DepartmentProductionReportComponent },
  { path: 'department/sales-report', component: DepartmentSalesReportComponent },
  { path: 'department/circulars', component: DepartmentCircularsComponent },
  { path: 'department/upload-circulars', component: DepartmentUplaodCircularComponent },
  { path: 'department/complaints', component: DepartmentComplaintsComponent },
  { path: 'department/user-management', component: DepartmentUserManagementComponent },
  { path: 'department/all-users', component: DepartmentAllUsersComponent },
  { path: 'search', component: SearchComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'indent_history', component: IndentComponent },
  { path: 'fpo/farmer-user-profile', component: FarmerUserProfileComponent }
];

