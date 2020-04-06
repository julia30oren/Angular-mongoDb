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
  public search_result: Array<any> = [];
  public open_cart: boolean = false;
  public message: string = localStorage.getItem('268431621_u') ? '' : 'to shop, please, logIn';

  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    //geting productes from database
    this.main_service.getProductes_fromDB()
      .subscribe(data => { this.productes_data_db = data; });
    console.log('2');

    if (JSON.parse(localStorage.getItem('268431621_u'))) {
      this.main_service.getUser_cart(JSON.parse(localStorage.getItem('268431621_u'))._id)
        .subscribe(data => {
          console.log(data);
          console.log('3');
          localStorage.setItem('w_345436583_l', JSON.stringify(data));
          console.log('4');
        })
    }

  }

  searchBYname(text: string) {
    if (text) {
      const result = this.productes_data_db.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      if (result) {
        this.search_result = result;
      }
    }

  }

  groupeBy(groupe: string) {
    if (groupe === 'All') {
      this.grouped_by = null;
    } else {
      const result = this.productes_data_db.filter(item => item.category === groupe)
      this.grouped_by = result;
    }
  }

  addToCart(item_id: number) {
    if (localStorage.getItem('268431621_u')) {
      this.main_service.saveProducte(item_id, JSON.parse(localStorage.getItem('268431621_u'))._id)
        .subscribe(data => {
          if (data.amount === 1) {
            console.log('data.amount', data.amount);
            this.data_service.add_newItem_toCart(data.item);
          } else {
            console.log('data.amount /////', data.amount);
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
    this.open_cart = !this.open_cart;
    console.log('4 open/close');
  }

}