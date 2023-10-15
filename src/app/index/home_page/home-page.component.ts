import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/service/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  products: Array<any> = []
  user_token: any
  constructor(private productservice: ProductService, private spinner: NgxSpinnerService) {
    this.user_token = localStorage.getItem('token')
  }
  // ngAfterViewInit() {
  //   this.mScrollbarService.initScrollbar('#dark-card', { axis: 'x', theme: 'dark-thin' });

  // }
  ngOnInit() {
    this.getProductAll()
    this.spinner.show()

  }
  addCart() {
    if (this.user_token != null) {
      console.log("ซื้อสินค้าเรียบร้อย")
    }
    else {
      console.log("User token already")
    }
  }


  getProductAll() {
    this.productservice.getallProducts().subscribe((rs) => {
      this.spinner.hide()
      if (rs?.status == 200) {
        for (let k = 0; k < rs?.result.length; k++) {
          // console.log(rs.result?.product_type)
          this.products.push(rs?.result[k])
          console.log(this.products)
        }
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
    // return this.http.get('http://localhost:5000/api/get_all').pipe(map(res => res.json(){}))
  }
  _detailProducts(_id: any) {
    //console.log('/web/prodcuts/' + _id)
    if (this.user_token == null) {
      window.location.href = '/web/login'
    }
    else {
      window.location.href = './web/prodcuts/' + _id
    }
  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
}
