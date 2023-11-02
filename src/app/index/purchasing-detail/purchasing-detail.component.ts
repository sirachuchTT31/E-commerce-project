import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/service/order.service';
import { TokenStorageService } from 'src/app/shared/service/token.storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchasing-detail',
  templateUrl: './purchasing-detail.component.html',
  styleUrls: ['./purchasing-detail.component.scss']
})
export class PurchasingDetailComponent {
  name_local: any
  user_id: any
  menu: string = 'purchasing'
  detail_menu: string = 'all'
  order_detail_object: Array<any> = []
  shop_detail_object: Array<any> = []
  constructor(private localService: TokenStorageService, private OrderService: OrderService, private spinner: NgxSpinnerService) {
    this.name_local = localService.nameStorage?.toUpperCase()
    this.user_id = localService.userId
  }
  ngOnInit() {
      this.spinner.show()
      this.getOrderlist(this.user_id)
  }
  set_detail_menu(flag: string) {
    this.detail_menu = flag
  }
  setProfiledetail() {

  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
  getOrderlist(id: string) {
    this.OrderService.getOrderById(id).subscribe((rs) => {
      if (rs?.status == 200) {
        this.spinner.hide()
        this.order_detail_object.push(rs.result)
        console.log("this.order_detail_object",this.order_detail_object)
        this.shop_detail_object.push(rs.result.shop)
      }
      else {
        this.spinner.hide()
      }
    })
  }
}
