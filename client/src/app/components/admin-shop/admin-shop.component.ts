import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit {

  private productes_data_db: Array<any>;
  public filtered_products: Array<any>;
  public open_form: boolean = false;
  private chosenProd: any;
  public prod_id: number;
  public product_name: string;
  public price: number;
  public quantity: number;
  public measure: string;
  public product_group: string;
  public image: string;
  public message: string;
  public response: any;
  public x: any
  constructor(
    private admin_service: AdminService,
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    //geting productes from database
    if (localStorage.getItem('2684_a_1621_')) {
      this.main_service.tokenVar(localStorage.getItem('2684_a_1621_'), 'admin')
        .subscribe(res => {
          this.x = res;
          if (this.x.responce) {
            console.log('ok');
            this.data_service.get_productes_fromDB();
            this.data_service.all_productes_list_from_service.subscribe(data => {
              this.filtered_products = data;
              this.productes_data_db = data;
            });
          } else {
            this.data_service.signAdmin(false);
            alert('Access denied!');
            this.router.navigate(['/home']);
            localStorage.clear();
          }
        })
    } else {
      alert('Access denied!');
      this.router.navigate(['/home']);
    }
  }

  searchBYname(text: string) {
    if (text) {
      const result = this.productes_data_db.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      if (result) {
        this.filtered_products = result;
      }
      else {
        this.filtered_products = this.productes_data_db;
      }
    }
  }

  groupeBy(groupe: string) {
    if (groupe === 'All') {
      this.filtered_products = this.productes_data_db;
    } else {
      const result = this.productes_data_db.filter(item => item.category === groupe)
      this.filtered_products = result;
    }
  }

  isChosen(item: object) {
    if (item) {
      this.chosenProd = item;
      if (this.chosenProd) {
        this.prod_id = this.chosenProd._id;
        this.product_name = this.chosenProd.name;
        this.product_group = this.chosenProd.category;
        this.price = this.chosenProd.price;
        this.quantity = this.chosenProd.for_quantity;
        this.measure = this.chosenProd.for_measure;
        this.image = this.chosenProd.image;
      }
    }

  }

  save(id: number) {
    if (this.product_name) {
      if (this.product_group) {
        if (this.price) {
          if (!isNaN(this.price)) {
            if (this.quantity || this.measure) {
              if (this.image) {
                const product = {
                  name: this.product_name,
                  category: this.product_group,
                  price: this.price,
                  for_quantity: this.quantity,
                  for_measure: this.measure,
                  image: this.image
                };
                if (id) {
                  this.saveChanged_toDB(id, product);
                } else {
                  this.saveNew_inDB(product);
                }
              } else this.message = '"Image" was not filled!';
            } else this.message = '"Product Quantity and Measure" were not chosen';
          } else this.message = '"Price" not valid'
        } else this.message = '"Price" was not filled!';
      } else this.message = '"Product Group" was not chosen';
    } else this.message = '"Product Name" was not filled!';
  }

  saveChanged_toDB(id: number, product: object) {
    this.admin_service.editProduct_DB(id, product)
      .subscribe(data => {
        if (data) {
          this.saveChanges_toArray(id);
        } else alert('Something went wrong.')
      });
  }

  saveChanges_toArray(id) {
    this.productes_data_db.forEach(element => {
      if (element._id === id) {
        element.name = this.product_name;
        element.category = this.product_group;
        element.price = this.price;
        element.for_quantity = this.quantity;
        element.for_measure = this.measure;
        element.image = this.image;
        this.filtered_products = this.productes_data_db;
      }
    });

  }

  saveNew_inDB(product: object) {
    this.admin_service.createNew_DB(product)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.response = data;
          if (this.response._id) {
            this.saveNew_toArray(this.response._id, product);
          }
        } else alert('Something went wrong.')
      });
  }

  saveNew_toArray(new_id: number, new_product: any) {
    new_product._id = new_id;
    console.log(new_product);
    this.productes_data_db.push(new_product);
    this.filtered_products = this.productes_data_db;
  }

  openOREclose() {
    this.open_form = !this.open_form;
  }

}