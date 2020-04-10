import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cart = JSON.parse(localStorage.getItem('w_345436583_l'));
  private user_name = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('268431621_u')) ? JSON.parse(localStorage.getItem('268431621_u')).name : '');
  public user_name_from_service = this.user_name.asObservable();
  private user_CART = new BehaviorSubject<Array<any>>(JSON.parse(localStorage.getItem('w_345436583_l')) ? JSON.parse(localStorage.getItem('w_345436583_l')) : []);
  public user_CART_from_service = this.user_CART.asObservable();
  private total_price = new BehaviorSubject<number>(0);
  public total_price_from_service = this.total_price.asObservable();
  private prices_array: Array<any> = [];
  private message_to_user = new BehaviorSubject<string>('Cart is empty');
  public message_from_service = this.message_to_user.asObservable();

  constructor() { }

  save_UserData(name: string) {
    this.user_name.next(name);
    this.getTotalPrice();
  }


  add_newItem_toCart(item: object) {
    this.cart.push(item);
    this.save(this.cart);
    this.getTotalPrice();
    this.message_to_user.next('')
  }

  increase_amount_of_Items(item_id: number) {
    this.cart.forEach(element => {
      if (element.item_id === item_id) {
        element.amount = element.amount + 1;
      }
    });
    this.save(this.cart);
    this.getTotalPrice();
  }

  decrease_amount_of_Items(item_id: number) {
    this.cart.forEach(element => {
      if (element.item_id === item_id) {
        element.amount = element.amount - 1;
      }
    });
    this.save(this.cart);
    this.getTotalPrice();
  }

  remove_item_from_cart(item_id: number) {
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id === item_id) {
        this.cart.splice(i, 1);
        this.save(this.cart);
        this.getTotalPrice();
      }
    };
    if (this.cart.length < 1) {
      this.message_to_user.next('Cart is empty')
    }

  }

  save(cart: Array<any>) {
    console.log('save')
    localStorage.setItem('w_345436583_l', JSON.stringify(cart));
    this.user_CART.next(cart);
  }

  getTotalPrice() {
    if (localStorage.getItem('w_345436583_l')) {
      this.prices_array = [];
      this.cart.forEach(element => {
        const a = element.amount * element.price;
        this.prices_array.push(a);
      });
      let total = this.prices_array.reduce((a, b) => a + b, 0);
      if (total > 0) {
        this.message_to_user.next('')
      }
      this.total_price.next(total);
    }

  }

  clean_cart() {
    this.save([]);
    this.total_price.next(0);
    this.message_to_user.next('Cart is empty');
  }
}