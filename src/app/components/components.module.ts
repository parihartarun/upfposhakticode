import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterCustumComponent } from './auth/footer/footerCustom.component';
import { AuthHeaderComponent } from './auth/auth-header/auth-header.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
   
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FooterCustumComponent,
    AuthHeaderComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FooterCustumComponent, AuthHeaderComponent
  ]
})
export class ComponentsModule { }
