import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostAccountsComponent } from './components/post-accounts/post-accounts.component';
import { GetAccountsComponent } from './components/get-accounts/get-accounts.component';

const routes: Routes = [
  { path: '', redirectTo: 'get', pathMatch: 'full' },
  { path: 'get', component: GetAccountsComponent },
  { path: 'post', component: PostAccountsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents = [
  GetAccountsComponent,
  PostAccountsComponent,
  PageNotFoundComponent
]