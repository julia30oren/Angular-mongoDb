import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public data_db: Array<any>;
  public grouped_by: Array<any> = null;
  public user_id: number;
  public adding_res: object;

  constructor(
    private main_service: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.main_service.getProductes_fromDB()
      .subscribe(data => { this.data_db = data; });
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
      const result = this.data_db.filter(item => item.category === groupe)
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
