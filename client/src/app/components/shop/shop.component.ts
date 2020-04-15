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
  public filtered_products: Array<any>;
  public open_cart: boolean = false;
  public open_orders: boolean = false;
  private save_resoult: any;
  public message: string = localStorage.getItem('268431621_u') ? '' : 'to shop, please, logIn';

  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    //geting productes from database
    this.main_service.getProductes_fromDB()
      .subscribe(data => {
        this.productes_data_db = data;
        this.filtered_products = data;
        console.log(this.filtered_products)
      });
    // console.log('2');

    if (JSON.parse(localStorage.getItem('268431621_u'))) {
      this.main_service.getUser_cart(JSON.parse(localStorage.getItem('268431621_u'))._id)
        .subscribe(data => {
          console.log(data);
          // console.log('3');
          localStorage.setItem('w_345436583_l', JSON.stringify(data));
          // console.log('4');
        })
    }

  }

  searchBYname(text: string) {
    if (text) {
      const result = this.productes_data_db.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      if (result) {
        this.filtered_products = result;
      }
    } else this.filtered_products = this.productes_data_db;


  }

  groupeBy(groupe: string) {
    if (groupe === 'All') {
      this.filtered_products = this.productes_data_db;
    } else {
      const result = this.productes_data_db.filter(item => item.category === groupe)
      this.filtered_products = result;
    }
  }

  addToCart(item_id: number) {
    if (localStorage.getItem('268431621_u').length > 0) {
      this.main_service.saveProducte(item_id, JSON.parse(localStorage.getItem('268431621_u'))._id)
        .subscribe(data => {
          this.save_resoult = data
          if (this.save_resoult.amount === 1) {
            // console.log('data.amount', this.save_resoult.amount);
            this.data_service.add_newItem_toCart(this.save_resoult.item);
          } else {
            // console.log('data.amount /////', this.save_resoult.amount);
            this.more(item_id);
          }
        });
    } else {
      alert(this.message)
    }

  }

  more(item_id) {
    this.data_service.increase_amount_of_Items(item_id);
  }

  openCart() {
    this.open_cart = true;
  }

  openOrders() {
    this.open_orders = true;
  }

  close() {
    this.open_cart = false;
    this.open_orders = false;
  }

}