import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PasschangeComponent } from './components/passchange/passchange.component';
import { ShopComponent } from './components/shop/shop.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  // { path: 'sign-in', component: SigninComponent },
  // { path: 'sign-up', component: SignupComponent },
  // { path: 'change-password', component: PasschangeComponent },
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
  // SigninComponent,
  // SignupComponent,
  // PasschangeComponent,
  PageNotFoundComponent
]