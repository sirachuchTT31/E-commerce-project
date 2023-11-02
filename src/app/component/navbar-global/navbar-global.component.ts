import { Component, ViewChild, AfterViewInit, Input, Injectable, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { DetailProductsComponent } from 'src/app/index/home_page/detail-products/detail-products.component';
import { CartService } from 'src/app/shared/service/cart.service';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar-global',
  templateUrl: './navbar-global.component.html',
  styleUrls: ['./navbar-global.component.scss']
})
export class NavbarGlobalComponent implements AfterViewInit, AfterContentInit {

  user_token: any
  name: any
  user_lastname: any
  cart_length: any
  cart_service_map_value: any
  user_name_service: any
  @Input() count_cart: any
  @ViewChild(DetailProductsComponent) child_parent?: DetailProductsComponent;

  constructor(private tokenStorageservice: TokenStorageService, private cartService: CartService) {
    this.user_token = this.tokenStorageservice.tokenStorage
    this.name = this.tokenStorageservice.nameStorage
    this.user_lastname = this.tokenStorageservice.lastnameStorage
    this.user_name_service = this.tokenStorageservice.usernameStorage
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    // setTimeout(()=>{
    //   this.cart_length = this.child_parent?.cart_service_map_value.length
    //   console.log(this.cart_length)
    // },5000)

  }
  setCount() {
    // this.cart_length = 
  }
  getCartbyUserName() {
    this.cartService.getCartbyUserName(this.user_name_service).subscribe((rs) => {
      if (rs?.status == 200) {
        this.cart_service_map_value = rs.result
        this.cart_length = this.cart_service_map_value.product_List.length
      }
      else {

      }
    })
  }
  ngAfterContentInit() {
    this.getCartbyUserName()
  }
  // setValue_Count(i: any) {
  //   this.cart_length = i
  //   console.log("Cart", this.cart_length)
  // }
  _signoutAuth() {
    Swal.fire({
      text: 'Are you sure you want to sign out',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sign out"
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.tokenStorageservice.signOut();
        window.location.href = '/web/login'
      }
    })

  }

}
