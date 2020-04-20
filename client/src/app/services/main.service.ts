import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product_Interface } from '../interfaces/productes';
import { Observable } from 'rxjs';
import { User_Interface } from '../interfaces/user';
import { TV_Interface } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Verification: string = 'http://localhost:5001/ver';
  private Productes_url: string = 'http://localhost:5001/productes';
  private Users_url: string = 'http://localhost:5001/user';

  constructor(
    private http: HttpClient
  ) { }

  tokenVar(token: string, user: string): Observable<TV_Interface[]> {
    const _result = this.http.post<TV_Interface[]>(`${this.Verification}`, { token: token, user: user });
    return _result;
  }

  getProductes_fromDB(): Observable<Product_Interface[]> {
    const getProductes_result = this.http.get<Product_Interface[]>(this.Productes_url);
    return getProductes_result;
  }

  createUser_DB(user: object): Observable<User_Interface[]> {
    console.log('new user to db 2')
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/new-user`, user);
    return res;
  }

  getUsers(): Observable<User_Interface[]> {
    const getUsers_result = this.http.get<User_Interface[]>(this.Users_url);
    return getUsers_result;
  }

  getUser_cart(id: number): Observable<User_Interface[]> {
    const getUsers_result = this.http.get<User_Interface[]>(`${this.Users_url}/cart/${id}`);
    return getUsers_result;
  }

  getUsers_address(id: number): Observable<User_Interface[]> {
    const address_result = this.http.get<User_Interface[]>(`${this.Users_url}/address/${id}`);
    return address_result;
  }

  logIn(user: object): Observable<User_Interface[]> {
    console.log('check 2 login');
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/user-login`, user);
    return res;
  }


  newPassword(newPAss: object): Observable<User_Interface[]> {
    const change_res = this.http.post<User_Interface[]>(`${this.Users_url}/password-change`, newPAss);
    return change_res;
  }

  saveProducte(item_id: number, user_id: number): Observable<Product_Interface[]> {
    const toCart = { "user_id": user_id, "item_id": item_id };
    const item_result = this.http.post<Product_Interface[]>(`${this.Users_url}/cart-add`, toCart);
    return item_result;
  }

  productAmount_decrease(item_id: number, user_id: number): Observable<Product_Interface[]> {
    const decrease_inCart = { "user_id": user_id, "item_id": item_id };
    const item_result = this.http.post<Product_Interface[]>(`${this.Users_url}/cart-remove`, decrease_inCart);
    return item_result;
  }

  product_delete(item_id: number, user_id: number): Observable<Product_Interface[]> {
    const deleteFromCart = { "user_id": user_id, "item_id": item_id };
    const item_result = this.http.post<Product_Interface[]>(`${this.Users_url}/cart-removeItem`, deleteFromCart);
    return item_result;
  }

  cleanCart_DB(user_id: number): Observable<Product_Interface[]> {
    const cleanCart_result = this.http.get<Product_Interface[]>(`${this.Users_url}/delete-WL/${user_id}`);
    return cleanCart_result;
  }

}
