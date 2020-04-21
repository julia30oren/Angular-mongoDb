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
  private userIsSigned: any;

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
        this.userIsSigned = data;

        switch (this.userIsSigned.status) {
          case 1:
            alert('User not found.');
            break;
          case 2:
            alert('Password do not metch.');
            break;
          case 3:
            alert(`Hello, ${this.userIsSigned.name}!`);
            localStorage.setItem('268431621_u', JSON.stringify({ name: this.userIsSigned.name, _id: this.userIsSigned._id }));
            localStorage.setItem('_t87582', this.userIsSigned.token);
            localStorage.setItem('w_345436583_l', JSON.stringify(this.userIsSigned.whish_list));
            this.data_service.signAdmin(false);
            this.data_service.save_UserData(this.userIsSigned.name, this.userIsSigned.whish_list.length);
            break;
          case 4:
            alert('Hello Admin');
            localStorage.setItem('2684_a_1621_', JSON.stringify(this.userIsSigned.token));
            this.data_service.signAdmin(true);
            break;
          default:
            alert('Sorry. Something went wrong. Please try again.');
        }
      })
  }

}