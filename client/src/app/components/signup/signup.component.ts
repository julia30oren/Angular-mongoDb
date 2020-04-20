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
  public user_id: string;
  public email: string;
  public password: string;
  public conf_p: string;

  public city: string;
  public street: string;
  public house: string;
  public apartments: string;
  public phone_num: number;

  public next_step: boolean = false;
  public newUser: object;
  public thisUser: Array<any>;
  public send: boolean = false;
  public message: string;
  private rep: any;

  constructor(
    private main_service: MainService,
    private router: Router
  ) { }

  ngOnInit() { }

  data1_check() {
    if (this.first_name) {
      if (this.last_name) {
        if (this.user_id) {
          if (this.email) {
            if (this.password) {
              if (this.password === this.conf_p) {
                this.newUser = {
                  first_name: this.first_name,
                  last_name: this.last_name,
                  id: this.user_id,
                  email: this.email,
                  password: this.password
                };
                this.next_step = true;
                this.message = '';
              } else { this.message = 'Password do not mutch' };
            } else { this.message = 'Password not filed' };
          } else { this.message = 'Email not filed'; }
        } else { this.message = 'ID not filed'; }
      } else { this.message = 'Last Name not filed'; }
    } else { this.newUser = {}; this.next_step = false; this.message = 'First Name  not filed'; }
  }

  data2_check() {
    if (this.first_name) {
      if (this.last_name) {
        if (this.user_id) {
          if (this.email) {
            if (this.password) {
              if (this.city) {
                if (this.street) {
                  if (this.house) {
                    if (this.apartments) {
                      if (this.phone_num) {
                        if (this.password === this.conf_p) {
                          this.newUser = {
                            first_name: this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1),
                            last_name: this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1),
                            PN: this.user_id,
                            email: this.email,
                            password: this.password,
                            city: this.city,
                            street: this.street.charAt(0).toUpperCase() + this.street.slice(1) + ' st.',
                            house: this.house,
                            apartments: this.apartments,
                            phone_num: this.phone_num
                          };
                          this.send = true;
                          this.message = '';
                          this.seaveNewUser();
                        } else { this.message = 'Password do not mutch' };
                      } else { this.message = 'Phone Number not filed' };
                    } else { this.message = 'Appartments not filed' };
                  } else { this.message = 'House not filed' };
                } else { this.message = 'Street not filed' };
              } else { this.message = 'City not filed' };
            } else { this.message = 'Password not filed' };
          } else { this.message = 'Email not filed'; }
        } else { this.message = 'ID not filed'; }
      } else { this.message = 'Last Name not filed'; }
    } else {
      this.send = false;
      this.message = 'First Name  not filed';
    }
  }

  backToStep1() {
    this.newUser = null;
    this.next_step = false;
  }

  seaveNewUser() {
    console.log('new user to db 1', this.newUser)
    this.main_service.createUser_DB(this.newUser)
      .subscribe(data => {
        this.rep = data;
        switch (this.rep.status) {
          case 5:
            alert('This user already exist.');
            break;
          case 6:
            alert(`User ${this.rep.name} signed in successfully.`);
            location.reload();
            break;
          default:
            console.log(data);
        }
      })
  }

}