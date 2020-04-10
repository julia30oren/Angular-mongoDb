import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasschangeComponent } from './components/passchange/passchange.component';
import { CartComponent } from './components/cart/cart.component';
import { CartToOrderComponent } from './components/cart-to-order/cart-to-order.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    routingComponents,
    SigninComponent,
    SignupComponent,
    PasschangeComponent,
    CartComponent,
    CartToOrderComponent,
    UserOrdersComponent,
    AdminOrdersComponent,
    AdminShopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
