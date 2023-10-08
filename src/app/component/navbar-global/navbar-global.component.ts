import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';

@Component({
  selector: 'app-navbar-global',
  templateUrl: './navbar-global.component.html',
  styleUrls: ['./navbar-global.component.scss']
})
export class NavbarGlobalComponent {
  user_token: any
  user_name: any
  user_lastname: any
  constructor(private tokenStorageservice: TokenStorageService) {
    this.user_token = this.tokenStorageservice.tokenStorage
    this.user_name = this.tokenStorageservice.nameStorage
    this.user_lastname = this.tokenStorageservice.lastnameStorage
  }

  _signoutAuth() {
    this.tokenStorageservice.signOut();
    window.location.href = '/web/home'
  }
}
