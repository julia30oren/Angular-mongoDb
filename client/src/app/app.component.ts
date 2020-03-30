import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService]
})
export class AppComponent implements OnInit {
  @ViewChild('stickyMenu', null) menuElement: ElementRef;
  elementPosition: any;
  public sticky: boolean = false;
  public userName: string;
  public open_cart: boolean = false;
  public user: any;
  public my_cart: Array<any>;

  public test_array: Array<any> = [];
  public total_price: number;
  //{ am: 2, price: 10 }, { am: 1, price: 8 }, { am: 2, price: 5 }
  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {

    setInterval(() => {
      if (JSON.parse(localStorage.getItem('user'))) {
        const usersDaTa = JSON.parse(localStorage.getItem('user'));
        this.userName = usersDaTa.userName;
      }
    }, 1000)
    // const name = this.data_service.users_name;
    // console.log('/// --- ', name)

    // this.userName = JSON.parse(localStorage.getItem('user')).userName;

    const userID = JSON.parse(localStorage.getItem('user')).userID || null;
    // console.log(userID);
    this.main_service.getUser_cart(userID)
      .subscribe(data => {
        this.user = data;
        localStorage.setItem('user', JSON.stringify({ userName: this.user.name, userID: this.user._id, whish_list: this.user.whish_list }));
        this.my_cart = this.user.whish_list;

        this.getTotalPrice();
      });
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  signOut() {
    // this.data_service.deleteUser();
    localStorage.removeItem('user');
    window.location.reload();
  }

  getTotalPrice() {
    this.test_array = [];
    this.my_cart.forEach(element => {
      const a = element.amount * element.price;
      this.test_array.push(a);
    });
    this.total_price = this.test_array.reduce((a, b) => a + b, 0);
    // console.log(this.total_price)
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
}
