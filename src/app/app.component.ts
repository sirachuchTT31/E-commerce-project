import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { TokenStorageService } from './shared/service/token.storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-web';
  page = ''
  token_time_out: any
  constructor(private router: Router, private routeActive: ActivatedRoute, private spinner: NgxSpinnerService,private tokenStorageservice: TokenStorageService) {
    this.spinner.show()
    this.token_time_out = this.tokenStorageservice.timeoutStorage
  }
  ngOnInit(): void {
    console.log(this.token_time_out)
    setTimeout(() => {
      console.log(this.router.url)
      let current = this.router.url.split('/')
      this.page = current[2]
      this.spinner.hide()
    }, 2000)
    this.timeout_token()
  }

  timeout_token() {
    if (this.token_time_out) {
      setTimeout(() => {
        this.tokenStorageservice.signOut()
        Swal.fire({
          icon: 'error',
          title: "Timeout token",
          showCancelButton: true,
          showConfirmButton: false,
        })
      }, this.token_time_out)
    }
  }
  // async _setTimeurl() {
  //   // let curent_url = 

  //   // await setTimeout(() => (
  //   //   console.log(this.page = current_url[1])
  //   // ));
  //   // await console.log("page", this.page)
  //   // let new_url = curent_url.split('/')
  //   // this.page = new_url[1]

  // }
}
