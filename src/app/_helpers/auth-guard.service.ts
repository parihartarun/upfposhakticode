import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
//import { CommonSettings } from '../_services/CommonSettings';

@Injectable()
export class AuthGuardService {
    userRole:number;
    department:number;

    constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // if(sessionStorage.getItem("userToken") === null) {
        //     return true;
        // } else {
        //   this.userRole = parseInt(localStorage.getItem('userRole'));

        //   if(this.userRole == CommonSettings.ROLE_ADMIN ){
        //     this.router.navigate(['/purchase-order']);
        //   }else if(this.userRole != CommonSettings.ROLE_USER){
        //     this.router.navigate(['/dashboard']);
        //   }else{
        //     this.department = parseInt(localStorage.getItem('department'));
        //     if(this.department == CommonSettings.DEPT_TRIM){
        //       this.router.navigate(['/production/trim-inwards']);
        //     }else if(this.department == CommonSettings.DEPT_FABRIC){
        //       this.router.navigate(['/production/fabric-inwards']);
        //     }else if(this.department == CommonSettings.DEPT_CUTTING){
        //       this.router.navigate(['/production/cutting-data']);
        //     }else if(this.department == CommonSettings.DEPT_SEWING){
        //       this.router.navigate(['/production/sewing-data']);
        //     }else if(this.department == CommonSettings.DEPT_KAJA_BUTTON){
        //       this.router.navigate(['/production/kaja-buttoning-data']);
        //     }else if(this.department == CommonSettings.DEPT_FINISHING){
        //       this.router.navigate(['/production/finishing-data']);
        //     }else if(this.department == CommonSettings.DEPT_FUSING){
        //       this.router.navigate(['/production/fusing-data']);
        //     }else if(this.department == CommonSettings.DEPT_DISPATCH){
        //       this.router.navigate(['/production/dispatch-details']);
        //     }else if(this.department == CommonSettings.DEPT_MECHANICAL){
        //       this.router.navigate(['/machines/list-machines']);
        //     }
        //   }
        // }
    }
}
