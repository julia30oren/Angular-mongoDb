import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-post-accounts',
  templateUrl: './post-accounts.component.html',
  styleUrls: ['./post-accounts.component.css']
})
export class PostAccountsComponent implements OnInit {

  public acount_number: number;
  public request_type: string;
  public amount: number;
  public procent: number;
  public paiements: number;
  public end_date: number;
  public new_request: object;

  constructor(
    private main_service: MainService
  ) { }

  ngOnInit() {
  }

  seaveNewRequest() {
    if (this.end_date && this.request_type === 'Loan') {
      console.log(this.end_date)

      this.new_request = {
        acount_number: this.acount_number,
        action_tipe: {
          tittle: this.request_type,
          amount: this.amount,
          procent: this.procent,
          paiements: this.paiements,
          end_date: this.end_date
        }
      }
      this.main_service.saveNew_Request(this.new_request)
        .subscribe(data => console.log(data))
    }
    else {
      this.new_request = {
        acount_number: this.acount_number,
        action_tipe: {
          tittle: this.request_type,
          amount: this.amount
        }
      }
      this.main_service.saveNew_Request(this.new_request)
        .subscribe(data => console.log(data))
    }
  }
}


