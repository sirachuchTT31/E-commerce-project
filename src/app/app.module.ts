
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './index/auth_page/auth-page.component';
import { HomePageComponent } from './index/home_page/home-page.component';
import { FooterGlobalComponent } from './component/footer-global/footer-global.component';
import { HeaderGlobalComponent } from './component/header-global/header-global.component';
import { NavbarGlobalComponent } from './component/navbar-global/navbar-global.component';
import { ConfigurationService } from './shared/service/configuration.service';
import { ProductService } from './shared/service/products.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeHeaderComponent } from './component/home-header/home-header.component';
import { DetailProductsComponent } from './index/home_page/detail-products/detail-products.component';
import { HeaderMenuFlagComponent } from './component/header-menu-flag/header-menu-flag.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
const _PROVIDER = [
  ConfigurationService,
  ProductService
]
@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    FooterGlobalComponent,
    HeaderGlobalComponent,
    NavbarGlobalComponent,
    HomeHeaderComponent,
    DetailProductsComponent,
    HeaderMenuFlagComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    HttpClient
    //   {
    //   provide: APP_INITIALIZER,
    //   useFactory: (configService: ConfigurationService) => () =>
    //     configService.configure(),
    //   multi: true,
    //   deps: [HttpClient, ConfigurationService]
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
