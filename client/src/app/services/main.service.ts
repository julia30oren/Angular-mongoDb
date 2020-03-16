import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product_Interface } from '../interfaces/productes';
import { Observable } from 'rxjs';
import { User_Interface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Productes_url: string = 'http://localhost:5001/productes';
  private Users_url: string = 'http://localhost:5001/user';

  constructor(
    private http: HttpClient
  ) { }

  getProductes_fromDB(): Observable<Product_Interface[]> {
    const getProductes_result = this.http.get<Product_Interface[]>(this.Productes_url);
    return getProductes_result;
  }

  getProducte(this_id): Observable<Product_Interface[]> {
    const item_result = this.http.get<Product_Interface[]>(`${this.Productes_url}/${this_id}`);
    return item_result;
  }

  createUser_DB(user: object): Observable<User_Interface[]> {
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/new-user`, user);
    return res;
  }

  getUsers(): Observable<User_Interface[]> {
    const getUsers_result = this.http.get<User_Interface[]>(this.Users_url);
    return getUsers_result;
  }

  logIn(user: object): Observable<User_Interface[]> {
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/user-login`, user);
    return res;
  }


  newPassword(newPAss: object): Observable<User_Interface[]> {
    const change_res = this.http.post<User_Interface[]>(`${this.Users_url}/password-change`, newPAss);
    return change_res;
  }
}
