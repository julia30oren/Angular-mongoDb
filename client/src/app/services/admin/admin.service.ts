import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product_Interface } from '../../interfaces/productes';
import { Observable } from 'rxjs';
import { User_Interface } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private admin_url: string = 'http://localhost:5001/admin';

  constructor(
    private http: HttpClient
  ) { }

  get_Users(): Observable<User_Interface[]> {
    const all_users_result = this.http.get<User_Interface[]>(`${this.admin_url}`);
    return all_users_result;
  }

  editProduct_DB(item_id: number, changes: object): Observable<Product_Interface[]> {
    console.log(item_id, changes)
    const edit_result = this.http.post<Product_Interface[]>(`${this.admin_url}/change/${item_id}`, changes);
    return edit_result;
  }

  createNew_DB(producte: object): Observable<Product_Interface[]> {
    const newP_result = this.http.post<Product_Interface[]>(`${this.admin_url}/new-producte`, producte);
    return newP_result;
  }
}
