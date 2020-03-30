import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_data_db: object;
  public ection_to_do: string = 'login';

  constructor(
    private main_service: MainService,
    private data_service: DataService,
  ) { }

  ngOnInit() {
    this.user_data_db = JSON.parse(localStorage.getItem('user'));
    // const c = this.data_service.user_name();
    // console.log(c);
    // .subscribe(arg => console.log(arg));
  }

  do_signout() {
    this.ection_to_do = 'login';
    this.user_data_db = null;
    localStorage.clear();
  }
  // signOut() {
  //   // this.data_service.deleteUser();
  //   localStorage.removeItem('user');
  //   window.location.reload();
  // }
}
