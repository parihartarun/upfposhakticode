import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
//import { CommonSettings } from '../_services/CommonSettings';

@Injectable()
export class AuthGuardService {
    userRole:number;
    department:number;

    constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(sessionStorage.getItem("accessToken") !== null) {
            return true;
        }else{
            this.router.navigate(['/']);
        } 
    }
}
