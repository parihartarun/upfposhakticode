import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'accessibility', component: AccessibilityComponent,
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent,
  },
];

@NgModule({
  declarations: [AccessibilityComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule, NgbModule, RouterModule.forChild(routes)
  ]
})
export class FooterContentModule { }
