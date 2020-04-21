import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_name: string;
  public ection_to_do: string = 'login';
  public numberOfItems: number;
  public admin: boolean;
  private x: any;
  public NofProd: number;

  constructor(
    private main_service: MainService,
    private data_service: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.data_service.user_name_from_service.subscribe(data => { this.user_name = data; });
    this.data_service.admin_from_service
      .subscribe(data => {
        if (data) {
          this.admin = true;
          this.main_service.tokenVar(localStorage.getItem('2684_a_1621_'), 'admin')
            .subscribe(res => {
              this.x = res;
              if (this.x.responce) {
              } else {
                this.data_service.save_UserData('', 0);
                this.data_service.signAdmin(false);
                alert('Access denied!');
                this.router.navigate(['/home']);
                localStorage.clear();
              }
            })
        } else {
          this.admin = false;
          if (localStorage.getItem('_t87582')) {
            this.main_service.tokenVar(localStorage.getItem('_t87582'), 'user')
              .subscribe(res => {
                this.x = res;
                if (this.x.response) {
                  this.data_service.NofItems_from_service.subscribe(num => this.numberOfItems = num);
                  this.main_service.getProductes_fromDB()
                    .subscribe(data => this.NofProd = data.length)
                } else {
                  this.data_service.save_UserData('', 0);
                  alert('Access denied!');
                  this.router.navigate(['/home']);
                  localStorage.clear();
                }
              })
          }
        }
      })
  }

}
