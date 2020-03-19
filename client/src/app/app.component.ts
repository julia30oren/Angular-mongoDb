import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService]
})
export class AppComponent implements OnInit {

  public userName: string;

  constructor(
    private main_service: MainService,
    private data_service: DataService
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
  }

  signOut() {
    // this.data_service.deleteUser();
    localStorage.removeItem('user');
    window.location.reload();
  }
}
