import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public location: Location;
  changePasswordForm: FormGroup;
  isLoggeIn = false;
  username = '';
  userId: any;
  submitted = false;
  userRole: any;
  isOpen = false;
  userstring = ""
  constructor(private fb: FormBuilder, location: Location, private toastr: ToastrService,
    private authService: AuthService, private element: ElementRef, private router: Router,
    private modalService: NgbModal, public translate: TranslateService) {
    this.location = location;
    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('hi');
      localStorage.setItem('language', 'hi');
    }
  }

  useLanguage(language: string) {
    console.log(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.toggleNavbar();
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    console.log(localStorage.getItem('language'));
    this.userRole = localStorage.getItem('userRole');
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
      this.userId = localStorage.getItem('userId');
    }
    this.createchangePasswordForm();
  }
  createchangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword'),

    })



  }
  get formControls() {
    return this.changePasswordForm.controls;
  }
  submitChangePassword(modal) {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.authService.changePassword({ userId: parseInt(this.userId), ...this.changePasswordForm.value }).subscribe(res => {
        if (res) {
          this.toastr.success('Password successfully changed');
          this.changePasswordForm.reset()
          modal.dismiss();
        } else {
          this.toastr.error('Something went wrong!');
        }
      })
    }
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    return 'Dashboard';
  }
  changePassword(content) {
    this.modalService.open(content)
  }
  logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('tokenType');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    localStorage.removeItem('masterId');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
