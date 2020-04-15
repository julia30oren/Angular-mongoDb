import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { element } from 'protractor';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  public data_from_DB: Array<any>;

  constructor(
    private orders_service: OrderService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('268431621_u')) {
      if (JSON.parse(localStorage.getItem('268431621_u'))._id) {
        this.orders_service.get1UserOrders_mySql(JSON.parse(localStorage.getItem('268431621_u'))._id)
          .subscribe(data => {
            this.data_from_DB = data;
            console.log(data);
            this.data_from_DB.forEach(element => {
              element.__order__ = JSON.parse(element.__order__).wl;
              element.order_address = JSON.parse(element.order_address);
            })
          })
      }
    }
  }

}
