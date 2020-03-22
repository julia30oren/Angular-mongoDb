import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public my_cart: Array<any>;
  constructor() { }

  ngOnInit() {
    this.my_cart = JSON.parse(localStorage.getItem('user')).whish_list;
    console.log(this.my_cart)
  }

  more(product: number, amount: number) {
    this.my_cart.forEach(element => {
      if (element.item_id === product) {
        element.amount = amount + 1
        console.log(element.amount)
      }
    });
  }

  less(product: number, amount: number) {
    this.my_cart.forEach(element => {
      if (element.item_id === product && element.amount > 1) {
        element.amount = amount - 1
        console.log(element.amount)
      }
      else if (element.item_id === product && element.amount <= 1) {
        for (var i = 0; i < this.my_cart.length; i++) {
          if (this.my_cart[i].item_id === product) {
            console.log(this.my_cart[i]);
            this.my_cart.splice(i, 1);
          }
        }
      }
    });
  }

  delete(product: number) {
    // console.log(product);
    for (var i = 0; i < this.my_cart.length; i++) {
      if (this.my_cart[i].item_id === product) {
        console.log(this.my_cart[i]);
        this.my_cart.splice(i, 1);
      }
    }
  }
}
