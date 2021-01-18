import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            localStorage.removeItem("accessToken");
            this.router.navigate(["login"]);
          } else if (err.status == 500) {
            this.router.navigate(["error", 500]);
          } else if (err.status == 400) {
            this.router.navigate(["error", 400]);
          } else if (err.status == 400) {
            this.router.navigate(["error", 400]);
          }
          const error = err.statusText;
          return throwError(error);
        })
      );
    }
}