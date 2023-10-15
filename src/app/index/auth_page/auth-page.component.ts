import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  status_page: string = 'login'
  authForm: FormGroup;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private tokenStorageservice: TokenStorageService) {
    this.authForm = new FormGroup({
      user_name: new FormControl(''),
      password: new FormControl('')
    })
    this.registerForm = new FormGroup({
      user_name: new FormControl(''),
      user_password: new FormControl(''),
      name: new FormControl(''),
      lastname: new FormControl(''),
    });
  }
  _setStatuspage(page: any) {
    this.status_page = page
    console.log(this.status_page)
  }
  submitLogin() {
    try {
      if (this.authForm.valid) {
        let param = {
          user_name: this.authForm.controls['user_name'].value,
          user_password: this.authForm.controls['password'].value
        }
        this.authService.postLogin(param).subscribe((rs) => {
          console.log(rs)
          if (rs?.status == 200) {
            this.tokenStorageservice.signIn(rs.result.payload.user_name, rs.result.token, rs.result.payload.name, rs.result.payload.lastname, rs.result.payload.user_profile, rs.result.time_out_token, rs.result.payload.role)
            Swal.fire({
              icon: 'success',
              text: rs?.message,
              //showCancelButton: true,
              showConfirmButton: false,
              timer: 3000
            }),
              window.location.href = '/web/prodcuts'
          }
          else {
            Swal.fire({
              icon: 'error',
              title: rs?.message,
              timer: 3000,
              showConfirmButton: false,
            })
          }
        })
      }
    }
    catch (e) {
      console.error(e)
    }
  }
  submitRegister() {
    try {
      let param = {
        user_name: this.registerForm.controls['user_name'].value,
        user_password: this.registerForm.controls['user_password'].value,
        name: this.registerForm.controls['name'].value,
        lastname: this.registerForm.controls['lastname'].value,
      }
      this.authService.postRegister(param).subscribe((rs) => {
        if (rs?.status == 200) {
          Swal.fire({
            icon: 'success',
            text: rs?.message,
            //showCancelButton: true,
            showConfirmButton: false,
            timer: 3000
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: rs?.message,
            timer: 3000,
            showConfirmButton: false,
          })
        }
      })
    }
    catch (e) {
      console.error(e)
    }
  }
}
