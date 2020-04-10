import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/shop', component: AdminShopComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents = [
  HomeComponent,
  ShopComponent,
  OrderComponent,
  AdminOrdersComponent,
  AdminShopComponent,
  PageNotFoundComponent
]