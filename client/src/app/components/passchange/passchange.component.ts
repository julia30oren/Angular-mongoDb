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
  private res: any;
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
    this.main_service.newPassword({ email: this.email, oldPass: this.password, password: this.new_password })
      .subscribe(data => {
        this.res = data;
        switch (this.res.status) {
          case 5:
            window.alert(`Password was changed successfully.`);
            window.location.reload();
            break;
          case 6:
            window.alert(`Password wasn't changed.`);
            break;
          case 7:
            window.alert(`Old password does not match.`);
            break;
          case 7:
            window.alert(this.res.message);
            break;
          default:
            window.alert(data);
        }
      })
  }
}
