import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'bgc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User = {username: ''};
  originalData: User = {username: ''};
  editMode = false;
  picture: any = '';

  constructor(
    formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.profileForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      mail: ['', [Validators.email]],
      phone: ['', [Validators.pattern('[- +()0-9]+')]],
      password: ['', [Validators.minLength(8)]],
      confirm: ['', [Validators.minLength(8)]]
    }, {
      validators: [
        () => this.comparePasswords(),
        () => this.mailOrPhone()
      ]
    });

    userService.user.subscribe((user: User) => {
      this.user = user;
      this.originalData = user;
    });
  }

  ngOnInit(): void {
    this.profileForm.controls['username'].setValue(this.user.username);
    this.profileForm.controls['mail'].setValue(this.user.mail);
    this.profileForm.controls['phone'].setValue(this.user.phone);

    this.getUserPhoto();
  }

  mailOrPhone() {
    if (!this.profileForm) return null;

    const { mail, phone } = this.profileForm.getRawValue();
    return (mail || phone) ? null : { match: true };
  }

  comparePasswords() {
    if (!this.profileForm) return null;

    const { password, confirm } = this.profileForm.getRawValue();
    return (password === confirm) ? null : { match: true };
  }

  editData() {
    this.editMode = true;
  }

  cancel() {
    this.editMode= false;
    this.profileForm.controls['username'].setValue(this.originalData.username);
    this.profileForm.controls['mail'].setValue(this.originalData.mail);
    this.profileForm.controls['phone'].setValue(this.originalData.phone);
  }

  showFS(input: HTMLInputElement) {
    input.click();
  }

  selectFile(e: Event) {
    const input = e.target as HTMLInputElement;
    console.log('Selected file: ', input.files![0]);

    this.userService.uploadPicture(input).subscribe({
      next: (response) => {
        console.log('Success: ', response);

        this.getUserPhoto();
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  getUserPhoto() {
    this.userService.getPicture().subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.picture = reader.result;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        this.picture = '';
      }
    );
  }

}
