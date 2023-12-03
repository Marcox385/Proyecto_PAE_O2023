import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bgc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    formBuilder: FormBuilder
  ) {
    this.signupForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      mail: ['', [Validators.email]],
      phone: ['', [Validators.pattern('[- +()0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: [
        () => this.comparePasswords(),
        () => this.mailOrPhone()
      ]
    });
  }

  comparePasswords() {
    if (!this.signupForm) return null;

    const { password, confirm } = this.signupForm.getRawValue();
    return (password === confirm) ? null : { match: true };
  }

  mailOrPhone() {
    if (!this.signupForm) return null;

    const { mail, phone } = this.signupForm.getRawValue();
    return (mail || phone) ? null : { match: true };
  }

  hasError(controlName: string, errorName: string) {
    return this.signupForm.controls[controlName].errors && this.signupForm.controls[controlName].errors![errorName];
  }

}
