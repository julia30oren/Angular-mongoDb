import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data/data.service';
import { AdminService } from 'src/app/services/admin/admin.service';

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
  constructor(
    private main_service: MainService,
    private admin_service: AdminService,
    private data_service: DataService
  ) { }

  ngOnInit() {
    //geting productes from database
    this.data_service.get_productes_fromDB();
    this.data_service.all_productes_list_from_service.subscribe(data => {
      this.filtered_products = data;
      this.productes_data_db = data;
    });
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
      // console.log(this.chosenProd);
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
                  this.saveChanges_toService(id);
                } else {
                  this.saveNew(product);
                  window.location.reload();
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
          console.log(data);
          this.response = data;
          alert(this.response);
          this.data_service.get_productes_fromDB();
        } else alert('Something went wrong.')
      });
  }

  saveChanges_toService(id) {
    this.productes_data_db.forEach(element => {
      if (element._id === id) {
        element.name = this.product_name;
        element.category = this.product_group;
        element.price = this.price;
        element.for_quantity = this.quantity;
        element.for_measure = this.measure;
        element.image = this.image;
        this.data_service.saveChanges(this.productes_data_db);
      }
    });

  }

  saveNew(product: object) {
    this.admin_service.createNew_DB(product)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.response = data;
          alert(this.response);
          this.data_service.get_productes_fromDB();
        } else alert('Something went wrong.')
      });
  }

  openOREclose() {
    this.open_form = !this.open_form;
  }

}