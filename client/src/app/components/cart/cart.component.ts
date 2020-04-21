import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private data_service: DataService,
    private main_service: MainService
  ) { }
  public my_cart: Array<any> = [];
  public total_price: number;
  public message: string;

  ngOnInit() {
    ///get users cart
    this.data_service.user_CART_from_service.subscribe(data => {
      this.my_cart = data;
    });
    ///get total price
    this.data_service.getTotalPrice();
    this.data_service.total_price_from_service.subscribe(data => {
      this.total_price = data;
    })
    this.data_service.message_from_service.subscribe(data => {
      this.message = data;
    });
  }

  more(item_id) {
    this.data_service.increase_amount_of_Items(item_id);
    this.add_toDB(item_id);
  }

  add_toDB(item_id) {
    this.main_service.saveProducte(item_id, JSON.parse(localStorage.getItem('268431621_u'))._id)
      .subscribe(data => {
      });
  }

  less(item_id, amount) {
    if (amount <= 1) {
      this.delete(item_id);
    } else {
      this.decrease_inDB(item_id);
      this.data_service.decrease_amount_of_Items(item_id);
    }
  }

  decrease_inDB(item_id) {
    this.main_service.productAmount_decrease(item_id, JSON.parse(localStorage.getItem('268431621_u'))._id)
      .subscribe(data => {
      });
  }

  delete(item_id) {
    this.data_service.remove_item_from_cart(item_id);
    this.remove_fromDB(item_id);
  }

  remove_fromDB(item_id) {
    this.main_service.product_delete(item_id, JSON.parse(localStorage.getItem('268431621_u'))._id)
      .subscribe(data => {
      });
  }

  cleaneCart() {
    ///DB side cleanCart_DB
    this.my_cart = [];
    this.data_service.clean_cart();
    this.main_service.cleanCart_DB(JSON.parse(localStorage.getItem('268431621_u'))._id)
      .subscribe(data => {
        console.log(data);
        ///client side
      });
  }
}
