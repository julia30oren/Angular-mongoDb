import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  public orders_fromDB: Array<any>;
  public extra: Array<any> = [];
  public price: number;
  public x;
  constructor(
    private admins_service: AdminService,
    private main_service: MainService,
    private data_service: DataService,
    private router: Router

  ) { }

  ngOnInit() {
    if (localStorage.getItem('2684_a_1621_')) {
      this.main_service.tokenVar(localStorage.getItem('2684_a_1621_'), 'admin')
        .subscribe(res => {
          this.x = res;
          if (this.x.responce) {
            this.admins_service.get_Orders()
              .subscribe(data => {
                this.orders_fromDB = data;
                this.orders_fromDB.forEach(element => {
                  element.order_address = JSON.parse(element.order_address);
                  element.__order__ = JSON.parse(element.__order__).wl;
                  if (element.done === 0) {
                    element.done = false;
                  } else element.done = true;
                });
              })
          } else {
            this.data_service.signAdmin(false);
            alert('Access denied!');
            this.router.navigate(['/home']);
            localStorage.clear();
          }
        });
    } else {
      alert('Access denied!');
      this.router.navigate(['/home']);
    }

  }

  changeState(order_id: number) {
    this.orders_fromDB.forEach(element => {
      if (element.order_id === order_id) {
        element.done = !element.done;
        this.admins_service.changeOrders_state(element.order_id)
          .subscribe(re => console.log(re))
      }
    })
  }

  extraInfo(_order_: Array<any>, f_price: number) {
    this.extra = _order_;
    this.price = f_price;
  }

  extraClean() {
    this.extra = [];
    this.price = null;
  }
}
