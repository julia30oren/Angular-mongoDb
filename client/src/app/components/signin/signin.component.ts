import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public message: string;
  public email: string;
  public password: string;
  public user: object;
  public email_empty: boolean = true;
  public password_empty: boolean = true;

  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
  }

  emptyEmail() {
    if (!this.email) {
      this.email_empty = false;
    } else this.email_empty = true;
  }

  emptyPass() {
    if (!this.password) {
      this.password_empty = false;
    } else this.password_empty = true;
  }

  login() {
    if (this.email && this.password) {
      this.user = {
        email: this.email,
        password: this.password
      }
      this.main_service.logIn(this.user)
        .subscribe(data => {
          if (data[0]) {
            this.message = 'ok'
          } else this.message = 'not ok'
        })
    }
  }

}
