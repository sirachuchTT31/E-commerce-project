import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent {
  _id: any
  product_detail: Array<any> = []
  _category: any
  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }
  ngOnInit() {
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
      this.productService.getproductById(this._id).subscribe((rs) => {
        if (rs?.status == 200) {
          let param = {
            result: rs.result
          }
          this.product_detail.push(rs.result)
          console.log(this.product_detail)
          //this.product_detail.push(rs.result)
          console.log(rs.result)
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
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
}
