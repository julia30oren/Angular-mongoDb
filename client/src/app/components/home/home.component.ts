import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data_db: Array<any>;
  public grouped_by: Array<any> = null;

  constructor(
    private main_service: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.main_service.getProductes_fromDB()
      .subscribe(data => this.data_db = data);
  }

  eddToCart(id: number) {
    // console.log('click', id);
    this.main_service.getProducte(id)
      .subscribe(data => this.data_db = data);
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
