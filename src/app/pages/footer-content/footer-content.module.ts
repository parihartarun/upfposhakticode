import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TranslateModule } from '@ngx-translate/core';
import { HyperlinkingPolicyComponent } from './hyperlinking-policy/hyperlinking-policy.component';
import { CopyrightPolicyComponent } from './copyright-policy/copyright-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  {
    path: 'accessibility', component: AccessibilityComponent,
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent,
  },
  {
    path: 'hyperlinking-policy', component: HyperlinkingPolicyComponent,
  },
  {
    path: 'copyright-policy', component: CopyrightPolicyComponent,
  },
  {
    path: 'terms-condition', component: TermsConditionComponent,
  },
  {
    path: 'disclaimer', component: DisclaimerComponent,
  },
  {
    path: 'help', component: HelpComponent,
  },
];

@NgModule({
  declarations: [AccessibilityComponent, PrivacyPolicyComponent, HyperlinkingPolicyComponent,
    CopyrightPolicyComponent, TermsConditionComponent, DisclaimerComponent, HelpComponent],
  imports: [
    CommonModule, NgbModule, RouterModule.forChild(routes), TranslateModule
  ]
})
export class FooterContentModule { }
