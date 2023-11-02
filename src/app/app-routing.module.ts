import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './index/home_page/home-page.component';
import { AuthPageComponent } from './index/auth_page/auth-page.component';
import { AppComponent } from './app.component';
import { DetailProductsComponent } from './index/home_page/detail-products/detail-products.component';
import { PurchasingDetailComponent } from './index/purchasing-detail/purchasing-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'products', component: HomePageComponent },
      { path: 'web/login', component: AuthPageComponent },
      { path: 'web/prodcuts/:id', component: DetailProductsComponent },
      { path: 'web/purchasing', component: PurchasingDetailComponent }
    ],
  },
  // { path: '', component: HomePageComponent },
  // { path: 'web/login', component: AuthPageComponent },
  // { path: 'web/home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
