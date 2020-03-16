import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-passchange',
  templateUrl: './passchange.component.html',
  styleUrls: ['./passchange.component.css']
})
export class PasschangeComponent implements OnInit {

  public message: string;
  public email: string;
  public password: string;
  public new_password: string;

  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
  }
  data_check() {
    if (this.email) {
      if (this.password) {
        if (this.new_password) {
          this.message = '';
          this.sendNewPassword();
        } else { this.message = 'NEW Password not filed' };
      } else { this.message = 'Password not filed' };
    } else { this.message = 'Email not filed'; }
  }


  sendNewPassword() {
    console.log('ok');
    this.main_service.newPassword({ email: this.email, oldPass: this.password, password: this.new_password })
      .subscribe(data => { window.alert(data) })
  }
}
