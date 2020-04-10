import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_name: string;
  public ection_to_do: string = 'login';
  public numberOfItems: number;

  constructor(
    private main_service: MainService,
    private data_service: DataService,
  ) { }

  ngOnInit() {
    this.data_service.user_name_from_service.subscribe(data => { this.user_name = data; });
    if (JSON.parse(localStorage.getItem('w_345436583_l'))) {
      const cart = JSON.parse(localStorage.getItem('w_345436583_l'));
      for (let i = 0; i < cart.length; i++) {
        this.numberOfItems = i + 1;
      }
    } else {
      this.numberOfItems = null;
    }

  }

  do_signout() {
    this.ection_to_do = 'login';
    this.data_service.save_UserData('');
    localStorage.clear();
  }
}
