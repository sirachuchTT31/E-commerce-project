import { CategoryService } from './../../../shared/service/category.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/service/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/service/cart.service';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';
import Swal from 'sweetalert2';
import { NavbarGlobalComponent } from 'src/app/component/navbar-global/navbar-global.component';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent {
  _id: any
  product_detail: Array<any> = []
  _category_code: any
  _category_name: string = ''
  detail_produts: FormGroup
  add_cart_product_Array: Array<any> = []
  user_name_storage: any
  cart_Array: Array<any> = []
  cart_service_map_value: Array<any> = []
  public testValue = "TEST"
  @ViewChild(NavbarGlobalComponent) child_parent?: NavbarGlobalComponent;
  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService,
    private spinner: NgxSpinnerService, private cartService: CartService, private localstorageService: TokenStorageService) {
    this.detail_produts = new FormGroup({
      product_id: new FormControl(''),
      product_name: new FormControl(''),
      product_for_company: new FormControl(''),
      product_detail: new FormControl(''),
      product_price: new FormControl(''),
      product_image: new FormControl(''),
      qty: new FormControl(1),
      type: new FormControl('')
    })
  }
  ngOnInit() {
    this.user_name_storage = this.localstorageService.usernameStorage
    this.detail_produts.controls['qty'].disable()
    this.spinner.show()
    try {
      this._id = this.route.snapshot.paramMap.get('id')
      console.log(this._id)
      this.getproductsById()
      this.getCartbyUserName()
    }
    catch (e) {
      console.log(e)
    }
  }


  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
  addCart(pd_name: any, pd_for_company: any, pd_detail: any, pd_price: any, pd_id: any, global_image: any) {
    if (this.localstorageService.tokenStorage) {
      this.detail_produts.controls['product_id'].setValue(pd_id)
      this.detail_produts.controls['product_name'].setValue(pd_name)
      this.detail_produts.controls['product_for_company'].setValue(pd_for_company)
      this.detail_produts.controls['product_detail'].setValue(pd_detail)
      this.detail_produts.controls['product_price'].setValue(pd_price)
      this.detail_produts.controls['product_image'].setValue(global_image)
      let new_product = {
        product_id: this.detail_produts.controls['product_id'].value,
        product_name: this.detail_produts.controls['product_name'].value,
        product_for_company: this.detail_produts.controls['product_for_company'].value,
        product_detail: this.detail_produts.controls['product_detail'].value,
        product_price: this.detail_produts.controls['product_price'].value,
        product_qty: this.detail_produts.controls['qty'].value,
        product_type: this.detail_produts.controls['type'].value,
        product_image: this.detail_produts.controls['product_image'].value
      }
      if (this.cart_service_map_value.length == 0) {
        this.cart_Array.push(new_product)
        let param = {
          user_name: this.user_name_storage,
          product_List: this.cart_Array
        }
        //call api 
        this.cartService.postCart(param)
      }
      else {
        this.cart_Array.push(new_product)
        let param = {
          user_name: this.user_name_storage,
          product_List: this.cart_Array
        }

        //call api
        this.cartService.updateCartbyUserName(param).subscribe((rs) => {
          if (rs?.status == 200) {
            //call localstorge 
            this.localstorageService.countCart(this.cart_service_map_value.length)
            //this.child_parent?.setValue_Count(this.cart_Array.length)
            Swal.fire({
              icon: 'success',
              text: rs?.message,
              timer: 3000,
              showConfirmButton: false,
            })
          }
          else {

          }
        })
      }

    }
    else {
      window.location.href = '/web/login'
    }
  }
  plusqty(maxQty: number) {
    if (maxQty > this.detail_produts.controls['qty'].value) {
      let qty = this.detail_produts.controls['qty'].value + 1
      this.detail_produts.controls['qty'].setValue(qty)
      console.log(this.detail_produts.controls['qty'].value)
    }
  }
  removeqty() {
    if (this.detail_produts.controls['qty'].value != 0) {
      let qty = this.detail_produts.controls['qty'].value - 1
      this.detail_produts.controls['qty'].setValue(qty)
    }
  }
  getproductsById() {
    try {
      this.productService.getproductById(this._id).subscribe(async (rs) => {
        if (rs?.status == 200) {
          this.product_detail.push(rs.result)
          this._category_code = rs.result.category_code
          await this.getCategoryName()
        }
        else {
          console.log(rs?.message)
        }
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  getCategoryName() {
    this.categoryService.getCategoryById(this._category_code).subscribe((rs) => {
      this.spinner.hide()
      if (rs?.status == 200) {
        this._category_name = rs.result.category_name
      }
      else {

      }
    })
  }
  getCartbyUserName() {
    this.cartService.getCartbyUserName(this.user_name_storage).subscribe((rs) => {
      if (rs?.status == 200) {
        for (let k = 0; k < rs.result.product_List.length; k++) {
          let param = {
            product_id: rs.result.product_List[k].product_id,
            product_detail: rs.result.product_List[k].product_detail,
            product_for_company: rs.result.product_List[k].product_for_company,
            product_name: rs.result.product_List[k].product_name,
            product_price: rs.result.product_List[k].product_price,
            product_qty: rs.result.product_List[k].product_qty,
            product_type: rs.result.product_List[k].product_type,
            product_image: rs.result.product_List[k].product_image
          }
          this.cart_service_map_value.push(param)
          //call localstorge 
          this.localstorageService.countCart(this.cart_service_map_value.length)
        }
      }
      else {

      }
    })
  }
}
