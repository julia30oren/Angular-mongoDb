import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import { Observable } from 'rxjs';
// import { Name_Interface } from 'src/app/interfaces/name';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ////// DATA
  public all_productes: Array<any>;
  private user_main_data = new BehaviorSubject<Array<any>>([JSON.parse(localStorage.getItem('user'))]);
  public user_data_from_service = this.user_main_data.asObservable();
  private user_name = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userName : '');
  public user_name_from_service = this.user_name.asObservable();
  private user_id = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userID : null);
  public user_id_from_service = this.user_id.asObservable();
  private order_list = new BehaviorSubject<Array<any>>(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).whish_list : []);
  public order_list_from_service = this.order_list.asObservable();

  constructor() { }

  save_UserData(users_data: Array<any>, name: string, id: number, whish_list: Array<any>) {
    this.user_main_data.next(users_data);
    this.user_name.next(name);
    this.user_id.next(id);
    this.order_list.next(whish_list);
  }
}
