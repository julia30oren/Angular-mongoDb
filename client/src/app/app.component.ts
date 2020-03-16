import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService]
})
export class AppComponent implements OnInit {

  public userName: string;

  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.userName = JSON.parse(localStorage.getItem('user'));
    }, 1000)
  }

  signOut() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
