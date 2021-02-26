import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<AdminLayoutComponent> {
  canDeactivate(
    component: AdminLayoutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let can = component.canDeactivate();
    console.log('isloggedin', can);

    if (can) {
      // alert('logged')
      return confirm('Are you want to continue');
    }
  }

}
