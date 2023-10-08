import { CategoryService } from './../../../shared/service/category.service';
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
  _category_code: any
  _category_name: string = ''
  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) {

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
}
