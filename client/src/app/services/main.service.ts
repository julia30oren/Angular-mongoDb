import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account_Interface } from '../interfaces/account-int';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Bank_url: string = 'http://localhost:5001/Bank-Accounts';

  constructor(
    private http: HttpClient
  ) { }

  saveNew_Request(request): Observable<Account_Interface[]> {
    const saveRequest_result = this.http.post<Account_Interface[]>(`${this.Bank_url}/new`, (request));
    return saveRequest_result;
  }

  getAccounts(request): Observable<Account_Interface[]> {
    // console.log(request)
    const get_result = this.http.post<Account_Interface[]>(`${this.Bank_url}/account`, { account_number: request });
    return get_result;
  }

  getAllAccounts(): Observable<Account_Interface[]> {
    const getAll_result = this.http.get<Account_Interface[]>(`${this.Bank_url}`);
    return getAll_result;
  }
}
