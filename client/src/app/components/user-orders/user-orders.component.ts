import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  public data_from_DB: Array<any>;
  public orders: Array<any>;
  public summary: Array<number>;

  constructor(
    private orders_service: OrderService
  ) { }

  ngOnInit() {
    this.orders = [];
    this.summary = [];
    if (localStorage.getItem('268431621_u')) {
      if (JSON.parse(localStorage.getItem('268431621_u'))._id) {
        this.orders_service.get1UserOrders_mySql(JSON.parse(localStorage.getItem('268431621_u'))._id)
          .subscribe(data => {
            this.data_from_DB = data;
            this.data_from_DB.forEach(element => {
              this.orders.push({ date: element.order_date });
              let c = JSON.parse(element.__order__).wl;
              for (let i = 0; i < c.length; i++) {
                // console.log(c[i].price, c[i].amount);
                let number = c[i].price * c[i].amount;
                this.summary.push(number);
                this.orders.push(c[i]);
              }
              console.log(this.orders)
            });
          })
      }
    }
  }

}
