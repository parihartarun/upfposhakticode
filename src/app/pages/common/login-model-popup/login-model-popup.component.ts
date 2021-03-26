import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';


@Component({
  selector: 'app-login-model-popup',
  templateUrl: './login-model-popup.component.html',
  styleUrls: ['./login-model-popup.component.css']
})
export class LoginModelPopupComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  userRole: any;
  @Output() logout = new EventEmitter<string>();
  @Input() fpoid:string;
  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  userLogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.api.userLogin(this.loginForm.value).subscribe(response => {
      console.log(response);
      if (response.accessToken != '') {
        sessionStorage.setItem('accessToken', response.token);
        sessionStorage.setItem('tokenType', response.token);
        localStorage.setItem('username', response.user.userName);
        localStorage.setItem('userRole', response.userRole);
        localStorage.setItem('masterId', response.masterId);
        localStorage.setItem('userId', response.user.userId);
        localStorage.setItem('roleRefId',response.user.roleRefId);
        this.userRole = localStorage.getItem('userRole');
        this.logout.emit(""+this.fpoid);
        //if (this.userRole == 'ROLE_FPC') {
        //  this.route.navigate(['/fpo/dashboard']);
        //} else if (this.userRole == 'ROLE_MIN') {
        //  this.route.navigate(['/department/dashboard']);
        //} else if (this.userRole == 'ROLE_BUYERSELLER') {
        //  this.route.navigate(['/indent_history']);
        //} else {
        //  this.route.navigate(['/fpo/dashboard']);
        //}
      }
    },
      err => {
        console.log(err)
      }
    );
  }
  handleSuccess(e) {
    console.log("ReCaptcha", e);
  } 

}
