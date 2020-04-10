import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order_Interface } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private Orders_url: string = 'http://localhost:5001/orders';

  constructor(
    private http: HttpClient
  ) { }

  placeOrder_mySql(order: object, id: number): Observable<Order_Interface[]> {
    const placeOrder_result = this.http.post<Order_Interface[]>(`${this.Orders_url}/new_order/${id}`, order);
    return placeOrder_result;
  }

  getOrdersDates_mySql(): Observable<Order_Interface[]> {
    const dates_result = this.http.get<Order_Interface[]>(`${this.Orders_url}/dates`);
    return dates_result;
  }

  get1UserOrders_mySql(id: number): Observable<Order_Interface[]> {
    const orderss_result = this.http.get<Order_Interface[]>(`${this.Orders_url}/${id}`);
    return orderss_result;
  }
}
