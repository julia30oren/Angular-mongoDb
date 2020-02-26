import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public name: string;
  public email: string;
  public password: string;
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
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(this.newUser);
      this.main_service.createUser_DB(this.newUser)
        .subscribe(data => console.log(data))

      this.router.navigate(['/sign-in']);

    }
  }

}
