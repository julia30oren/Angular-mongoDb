import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-get-accounts',
  templateUrl: './get-accounts.component.html',
  styleUrls: ['./get-accounts.component.css']
})
export class GetAccountsComponent implements OnInit {

  public data_db: Array<any>
  public search_: number;

  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
    this.main_service.getAllAccounts()
      .subscribe(data => this.data_db = data);
  }

  serch_byNumber() {
    if (this.search_) {
      console.log(this.search_);
      this.main_service.getAccounts(this.search_)
        .subscribe(data => this.data_db = data);
    }
  }
}
