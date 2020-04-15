import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  public orders_fromDB: Array<any>;
  public extra: Array<any> = [];
  public price: number;
  constructor(
    private admins_service: AdminService
  ) { }

  ngOnInit() {
    this.admins_service.get_Orders()
      .subscribe(data => {
        console.log(data);
        this.orders_fromDB = data;
        this.orders_fromDB.forEach(element => {
          element.order_address = JSON.parse(element.order_address);
          element.__order__ = JSON.parse(element.__order__).wl;
          if (element.done === 0) {
            element.done = false;
          } else element.done = true;
        });
      })
  }

  changeState(order_id: number) {
    this.orders_fromDB.forEach(element => {
      if (element.order_id === order_id) {
        // console.log(element.done);
        element.done = !element.done;
      }
    })
  }

  extraInfo(_order_: Array<any>, f_price: number) {
    this.extra = _order_;
    this.price = f_price;
    console.log(this.extra);
  }

  extraClean() {
    this.extra = [];
    this.price = null;
  }
}
