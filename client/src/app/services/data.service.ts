import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // public users_name: string;
  // public users_id: number;
  public allProductes: Array<any>;
  public users_cart: Array<any> = [];

  constructor() { }

  // userName(name: string) {
  //   this.users_name = name;
  //   console.log(this.users_name);
  // }
  // getUserName() {
  //   console.log(this.users_name)
  //   return this.users_name;
  // }
  // userID(ID: number) {
  //   this.users_id = ID;
  //   console.log(this.users_id);
  // }
  // deleteUser() {
  //   this.users_name = null;
  //   this.users_id = null;
  //   this.users_cart = null;
  // }
  saveProductesToService(productes: Array<any>) {
    this.allProductes = productes;
    // console.log(this.allProductes);
  }

  getInfo(item_id: number) {
    this.allProductes.filter(item => item.item_id === item_id)
  }

  myCart(my_cart: Array<any>) {
    this.users_cart = my_cart;
    console.log(this.users_cart);
  }

  addTo_myCart(item: object) {
    this.users_cart.push({ item });
    console.log(this.users_cart);
  }
}
