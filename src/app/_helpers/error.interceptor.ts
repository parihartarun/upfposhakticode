import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr:ToastrService) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError(err => {
          console.log(err);
          if (err.status !== 404) {
            this.toastr.error(err.error.message);
          }
          // if (err.status === 401) {
          //   localStorage.removeItem("accessToken");
          //   this.router.navigate(["login"]);
          // } else if (err.status == 500) {
          //   this.router.navigate(["error", 500]);
          // } else if (err.status == 400) {
          //   this.router.navigate(["error", 400]);
          // } else if (err.status == 400) {
          //   this.router.navigate(["error", 400]);
          // }
           const error = err.statusText;
           return throwError(error);
        })
      );
    }
}