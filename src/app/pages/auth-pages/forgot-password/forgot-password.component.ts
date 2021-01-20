import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../_services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  get formControls(){
    return this.forgotPasswordForm.controls;
  }

  sendForgotPasswordEmail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
        return;
    }
    this.api.sendForgotPasswordEmail(this.forgotPasswordForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

}
