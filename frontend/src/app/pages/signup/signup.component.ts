import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'bgc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  disallowUse: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar) {
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  signup() {
    this.disallowUse = true;
    const { username, mail, phone, password } = this.signupForm.getRawValue();
    this.userService.register(username, mail, phone, password).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar('Usuario registrado exitósamente.');

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2333);
      },
      (err: Error) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 409) {
            this.openSnackBar('El usuario ya existe.');
          }
          this.disallowUse = false;
        }
      }
    );
  }

}
