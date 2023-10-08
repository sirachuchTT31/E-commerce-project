import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './index/home_page/home-page.component';
import { AuthPageComponent } from './index/auth_page/auth-page.component';
import { AppComponent } from './app.component';
import { DetailProductsComponent } from './index/home_page/detail-products/detail-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'web/prodcuts', component: HomePageComponent },
      { path: 'web/login', component: AuthPageComponent },
      { path: 'web/prodcuts/:id', component: DetailProductsComponent }
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
