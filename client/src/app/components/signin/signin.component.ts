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
  public logedInUser: any;

  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
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
    // console.log(this.user)
    this.main_service.logIn(this.user)
      .subscribe(data => {
        // console.log(data);
        this.logedInUser = data;
        this.data_service.save_UserData(data);
        localStorage.setItem('user', JSON.stringify({ userName: this.logedInUser.name, userID: this.logedInUser._id, whish_list: this.logedInUser.whish_list }));
        // this.router.navigate(['/home']);
      })
  }

}
