import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bgc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      mail: ['', [Validators.email]],
      phone: [''],
      password: ['', [Validators.required]]
    }, {
      validators: [() => this.mailOrPhone()]
    });
  }

  mailOrPhone() {
    if (!this.loginForm) return null;

    const { mail, phone } = this.loginForm.getRawValue();
    return (mail || phone) ? null : { match: true };
  }

  login(user: string, password: string) {
    this.authService.login(user, password)
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].errors && this.loginForm.controls[controlName].errors![errorName];
  }
}
