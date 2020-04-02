import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public productes_data_db: Array<any>;
  public grouped_by: Array<any> = null;
  public open_cart: boolean = false;
  public user_id: number;
  public my_cart: Array<any>;
  public message: string;

  public adding_res: object;
  public user: any;
  public test_array: Array<any> = [];
  public total_price: number;


  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    //geting productes from database
    this.main_service.getProductes_fromDB()
      .subscribe(data => { this.productes_data_db = data; });
    //subscribing service
    this.data_service.user_id_from_service.subscribe(data => {
      if (data === null) {
        this.message = 'to shope you need to login'
      } else {
        this.user_id = data;
        this.data_service.order_list_from_service.subscribe(data => {
          if (!data[0]) {
            this.message = 'cart is empty';
          } else {
            this.my_cart = data;
          }
        });
      }
    });
    //counting final some
    this.getTotalPrice();
  }


  getTotalPrice() {
    this.test_array = [];
    this.my_cart.forEach(element => {
      const a = element.amount * element.price;
      this.test_array.push(a);
    });
    this.total_price = this.test_array.reduce((a, b) => a + b, 0);
  }

  openCart() {
    this.open_cart = !this.open_cart
  }

  more(product: number, amount: number) {
    //add to database
    this.main_service.saveProducte(product, this.user._id)
      .subscribe(data => { console.log(data) });

    //client side
    this.my_cart.forEach(element => {
      if (element.item_id === product) {
        element.amount = amount + 1
      }
    });
    this.getTotalPrice();

  }

  less(product: number, amount: number) {
    //remove from database
    this.main_service.deleteProducte(product, this.user._id)
      .subscribe(data => { console.log(data) });

    //client side
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
    this.getTotalPrice();
  }

  //no conect to DB
  delete(product: number) {
    for (var i = 0; i < this.my_cart.length; i++) {
      if (this.my_cart[i].item_id === product) {
        console.log(this.my_cart[i]);
        this.my_cart.splice(i, 1);
      }
    };
    this.getTotalPrice();
  }

  addToCart(item_id: number) {
    const usersDaTa = JSON.parse(localStorage.getItem('user'));
    this.user_id = usersDaTa.userID;
    // console.log('click', this.user_id, item_id);
    this.main_service.saveProducte(item_id, this.user_id)
      .subscribe(data => { console.log('///', data); this.adding_res = data; });
  }

  groupeBy(groupe: string) {
    // console.log('groupe by', groupe);
    if (groupe === 'All') {
      this.grouped_by = null;
    } else {
      const result = this.productes_data_db.filter(item => item.category === groupe)
      this.grouped_by = result;
    }
  }



  // moreDetail(id: string) {
  //   this.router.navigate(['/task', id]);
  // }

  // done(id: string) {
  //   this.main_service.setTask_done(id)
  //     .subscribe(data => console.log(data));
  //   location.reload();
  // }

  // delete(id: string) {
  //   this.main_service.Delete_Task(id)
  //     .subscribe(data => console.log(data));
  //   location.reload();
  // }


}
