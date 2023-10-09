import { CategoryService } from './../../../shared/service/category.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/service/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/service/cart.service';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';
import Swal from 'sweetalert2';

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
  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private spinner: NgxSpinnerService, private cartService: CartService, private localstorageService: TokenStorageService) {
    this.detail_produts = new FormGroup({
      product_id: new FormControl(''),
      product_name: new FormControl(''),
      product_for_company: new FormControl(''),
      product_detail: new FormControl(''),
      product_price: new FormControl(''),
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
    }
    catch (e) {
      console.log(e)
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
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
  addCart(pd_name: any, pd_for_company: any, pd_detail: any, pd_price: any, pd_id: any) {
    this.detail_produts.controls['product_id'].setValue(pd_id)
    this.detail_produts.controls['product_name'].setValue(pd_name)
    this.detail_produts.controls['product_for_company'].setValue(pd_for_company)
    this.detail_produts.controls['product_detail'].setValue(pd_detail)
    this.detail_produts.controls['product_price'].setValue(pd_price)
    console.log(this.localstorageService.usernameStorage)
    //const user_name = this.localstorageService.usernameStorage
    let param = {
      user_name: this.user_name_storage,
      product_id: this.detail_produts.controls['product_id'].value,
      product_name: this.detail_produts.controls['product_name'].value,
      product_for_company: this.detail_produts.controls['product_for_company'].value,
      product_detail: this.detail_produts.controls['product_detail'].value,
      product_price: this.detail_produts.controls['product_price'].value,
      product_qty: this.detail_produts.controls['qty'].value,
      product_type: this.detail_produts.controls['type'].value,
    }
    //this.add_cart_product_Array.push(this.detail_produts.value)
    this.cartService.postCart(param).subscribe((rs) => {
      if (rs?.status == 200) {
        console.log(rs.result)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: rs?.message,
          showCancelButton: true,
          showConfirmButton: false,
        })
      }
    })
    console.log(this.add_cart_product_Array)
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
}
