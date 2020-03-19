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

}
