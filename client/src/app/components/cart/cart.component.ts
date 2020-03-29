import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public my_cart: Array<any>;
  public user: any;
  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
    const userID = JSON.parse(localStorage.getItem('user')).userID;
    console.log(userID);
    this.main_service.getUser_cart(userID)
      .subscribe(data => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify({ userName: this.user.name, userID: this.user._id, whish_list: this.user.whish_list }));
        this.my_cart = this.user.whish_list;
      })
    // this.my_cart = JSON.parse(localStorage.getItem('user')).whish_list;
    // console.log(this.my_cart)
  }

  more(product: number, amount: number) {
    //add to database
    this.main_service.saveProducte(product, this.user._id)
      .subscribe(data => { alert(data) });

    //client side
    this.my_cart.forEach(element => {
      if (element.item_id === product) {
        element.amount = amount + 1
      }
    });

  }

  less(product: number, amount: number) {
    //remove from database
    this.main_service.deleteProducte(product, this.user._id)
      .subscribe(data => { alert(data) });


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
