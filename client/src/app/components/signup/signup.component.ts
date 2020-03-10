import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public first_name: string;
  public last_name: string;
  public user_id: number;
  public email: string;
  public password: string;
  public city: string;
  public street: string;
  public house: string;
  public apartments: string;
  public phone_num: string

  public conf_p: string;
  public pas_ok: boolean = true;
  public newUser: object;

  constructor(
    private main_service: MainService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  paswordCheck() {
    if (this.password === this.conf_p) {
      this.pas_ok = true;
    } else this.pas_ok = false;
  }

  seaveNewUser() {
    if (this.pas_ok) {
      this.newUser = {
        first_name: this.first_name,
        last_name: this.last_name,
        id: this.user_id,
        email: this.email,
        password: this.password,
        city: this.city,
        street: this.street,
        house: this.house,
        apartments: this.apartments,
        phone_num: this.phone_num
      }
      console.log(this.newUser);
      // this.main_service.createUser_DB(this.newUser)
      //   .subscribe(data => console.log(data))

      // this.router.navigate(['/sign-in']);

    }
  }

  backToStep1() {
    this.newUser = null;
  }

}
