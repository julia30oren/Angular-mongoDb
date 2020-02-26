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

  constructor(
    private main_service: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.main_service.getTasks_DB()
      .subscribe(data => this.data_db = data);
  }

  moreDetail(id: string) {
    this.router.navigate(['/task', id]);
  }

  done(id: string) {
    this.main_service.setTask_done(id)
      .subscribe(data => console.log(data));
    location.reload();
  }

  delete(id: string) {
    this.main_service.Delete_Task(id)
      .subscribe(data => console.log(data));
    location.reload();
  }

}
