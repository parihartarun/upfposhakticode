import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  valueLabel: string = 'email';

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      type: ['email', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/),
        ],
      ],
      mobile: [''],
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  get getTypeControl(): AbstractControl {
    return this.forgotPasswordForm.get('type');
  }

  onChangeType() {
    let value = this.forgotPasswordForm.get('type').value;
    this.forgotPasswordForm.get('email').clearValidators();
    this.forgotPasswordForm.get('email').patchValue('');

    this.forgotPasswordForm.get('mobile').clearValidators();
    this.forgotPasswordForm.get('mobile').patchValue('');

    if (value == 'email' || value == 'both') {
      this.valueLabel = 'email';
      this.forgotPasswordForm
        .get('email')
        .setValidators([
          Validators.required,
          Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/),
        ]);
    }

    if (value == 'mobile' || value == 'both') {
      this.valueLabel = 'Mobile';
      this.forgotPasswordForm
        .get('mobile')
        .setValidators([Validators.required, Validators.pattern('[0-9 ]{10}')]);
    }
    this.forgotPasswordForm.get('email').updateValueAndValidity();
    this.forgotPasswordForm.get('mobile').updateValueAndValidity();
  }

  sendForgotPasswordEmail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.api
      .sendForgotPasswordEmail(this.forgotPasswordForm.value)
      .subscribe((response) => {
        this.submitted = false;
        this.toastr.success(response.message);
        this.forgotPasswordForm.reset();
      });
  }
}
