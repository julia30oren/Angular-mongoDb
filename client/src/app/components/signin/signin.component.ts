import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

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

  constructor(
    private main_service: MainService,
    private data_service: DataService
  ) { }

  ngOnInit() {
  }

  data_check() {
    if (this.email) {
      if (this.password) {
        this.login();
      } else { this.message = 'Password not filed'; }
    } else { this.message = 'Email not filed'; }
  }

  login() {
    this.user = {
      email: this.email,
      password: this.password
    }
    this.main_service.logIn(this.user)
      .subscribe(data => {
        console.log(data);
        if (!data) {
          alert('user not found')
        } else {
          this.data_service.save_UserData(data.name);
          localStorage.setItem('268431621_u', JSON.stringify({ name: data.name, _id: data._id }));
          localStorage.setItem('w_345436583_l', JSON.stringify(data.whish_list));
        }
      })
  }

}
