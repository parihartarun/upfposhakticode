import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = sessionStorage.getItem("accessToken");
    this.spinner.show();
    //let tokenType = sessionStorage.getItem('tokenType');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + currentUser
        }
      });
    }

    return next.handle(request) .pipe(
      finalize(() => {
        this.spinner.hide();
        // this.ts.warning('Please check your internet connection');
      }),
    );
  }

}