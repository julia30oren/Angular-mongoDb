import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product_Interface } from '../../interfaces/productes';
import { Order_Interface } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private admin_url: string = 'http://localhost:5001/admin';

  constructor(
    private http: HttpClient
  ) { }

  get_Orders(): Observable<Order_Interface[]> {
    const all_orders_result = this.http.get<Order_Interface[]>(`${this.admin_url}/orders`);
    return all_orders_result;
  }

  editProduct_DB(item_id: number, changes: object): Observable<Product_Interface[]> {
    // console.log(item_id, changes)
    const edit_result = this.http.post<Product_Interface[]>(`${this.admin_url}/change/${item_id}`, changes);
    return edit_result;
  }

  createNew_DB(producte: object): Observable<Product_Interface[]> {
    console.log('2');
    const newP_result = this.http.post<Product_Interface[]>(`${this.admin_url}/new-producte`, producte);
    return newP_result;
  }

  changeOrders_state(order_id: number): Observable<Product_Interface[]> {
    const change_result = this.http.get<Product_Interface[]>(`${this.admin_url}/order-st/${order_id}`);
    return change_result;
  }
}
