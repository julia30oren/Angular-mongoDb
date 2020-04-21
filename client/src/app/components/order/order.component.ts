import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data/data.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public userVar: boolean = true;
  public useAddress: boolean = false;
  public Address: Array<any>;
  public city: string;
  public street: string;
  public house: string;
  public apartments: string;
  public phone_num: number;
  public shipping_date: Date;
  private card_number: number;
  private expiration_month: number;
  private expiration_year: number;
  private finale_price: number;
  public comment: string;
  public warning_message: boolean = false;
  public message: any;

  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private orders_service: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orders_service.getOrdersDates_mySql().subscribe(dates => console.log(dates))
    if (JSON.parse(localStorage.getItem('268431621_u'))) {
      if (JSON.parse(localStorage.getItem('268431621_u'))._id) {
        this.userVar = true;
        if (localStorage.getItem('w_345436583_l') === '[]') {
          this.message = 'Cart is empty.'
        } else {
          ///get total price
          this.data_service.getTotalPrice();
          this.data_service.total_price_from_service.subscribe(data => {
            this.finale_price = data;
          })
        }

      }
      else this.userVar = false;
    } else this.userVar = false;
  }

  use_adress() {
    this.useAddress = !this.useAddress;
    if (this.useAddress === true && JSON.parse(localStorage.getItem('268431621_u'))) {
      this.main_service.getUsers_address(JSON.parse(localStorage.getItem('268431621_u'))._id).subscribe(data => {
        this.Address = data;
        this.city = this.Address[0].city;
        this.street = this.Address[0].street;
        this.house = this.Address[0].house;
        this.apartments = this.Address[0].apartments;
        this.phone_num = this.Address[0].phone_num;
      })
    } else {
      this.Address = [];
      this.city = '';
      this.street = '';
      this.house = '';
      this.apartments = '';
      this.phone_num = null;
    }
  }

  finishOrder() {
    console.log('finish');
    if (JSON.parse(localStorage.getItem('268431621_u'))._id) {
      if (this.city) {
        if (this.street) {
          if (this.house) {
            if (this.phone_num) {
              if (this.shipping_date) {
                if (this.card_number) {
                  if (this.expiration_month && this.expiration_year) {
                    this.warning_message = false;
                    const Order = {
                      address: {
                        city: this.city,
                        street: this.street,
                        house: this.house,
                        apartments: this.apartments,
                        phone_num: this.phone_num
                      },
                      card_number: this.card_number,
                      exp_date: `${this.expiration_month}/${this.expiration_year}`,
                      finale_price: this.finale_price.toFixed(2),
                      comment: this.comment || 'no comments',
                      shipping_date: this.shipping_date
                    }
                    console.log(Order);
                    this.orders_service.placeOrder_mySql(Order, JSON.parse(localStorage.getItem('268431621_u'))._id).subscribe(data => {
                      if (data) {
                        this.data_service.clean_cart();
                        ///message
                        alert('YOUR ORDER HAS BEEN PLACED! Thanks for shopping with us online!');
                        //redirect
                        this.router.navigate(['/shop']);
                      } else { alert('Something went wrong :(') }
                    })
                  } else { this.message = 'All fields should be filed. No "Expiration date"'; this.warning_message = true; }
                } else { this.message = 'All fields should be filed. No "Card number"'; this.warning_message = true; }
              } else { this.message = 'All fields should be filed. No "Shipping date" chosen'; this.warning_message = true; }
            } else { this.message = 'All fields should be filed. No "Phone number"'; this.warning_message = true; }
          } else { this.message = 'All fields should be filed. No "House number"'; this.warning_message = true; }
        } else { this.message = 'All fields should be filed. No "Street"'; this.warning_message = true; }
      } else { this.message = 'All fields should be filed. No "City"'; this.warning_message = true; }
    } else {
    }

  }
}
