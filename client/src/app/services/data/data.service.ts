import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Name_Interface } from 'src/app/interfaces/name';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private main_data: Array<any>;
  public User_name: string;
  private list: Array<any>;

  constructor() { }

  save_UserData(users_data: object) {
    this.main_data = [users_data];
    this.User_name = this.main_data[0].name;
    this.list = this.main_data[0].whish_list;
    // console.log(this.list)
  }

  // user_name(): Observable<Name_Interface[]> {
  //   // const name = { name: this.User_name }
  //   // return { name };
  // }
}
