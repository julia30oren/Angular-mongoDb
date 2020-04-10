import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-cart-to-order',
  templateUrl: './cart-to-order.component.html',
  styleUrls: ['./cart-to-order.component.css']
})
export class CartToOrderComponent implements OnInit {

  constructor(
    private data_service: DataService,
    private main_service: MainService
  ) { }
  public my_cart: Array<any>;
  public total_price: number;
  public message: string;

  ngOnInit() {
    ///get users cart
    this.data_service.user_CART_from_service.subscribe(data => this.my_cart = data);
    ///get total price
    this.data_service.total_price_from_service.subscribe(data => this.total_price = data);
  }

}
