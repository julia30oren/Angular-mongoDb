import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product_Interface } from '../interfaces/productes';
import { Observable } from 'rxjs';
import { User_Interface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Productes_url: string = 'http://localhost:5001/productes';
  private Users_url: string = 'http://localhost:5001/user';

  constructor(
    private http: HttpClient
  ) { }

  getProductes_fromDB(): Observable<Product_Interface[]> {
    const getProductes_result = this.http.get<Product_Interface[]>(this.Productes_url);
    return getProductes_result;
  }

  getProducte(this_id): Observable<Product_Interface[]> {
    const item_result = this.http.get<Product_Interface[]>(`${this.Productes_url}/${this_id}`);
    return item_result;
  }

  // saveTask(to_do): Observable<Task_Interface[]> {
  //   const saveTask_result = this.http.post<Task_Interface[]>(`${this.Tasks_url}/new-task`, (to_do));
  //   return saveTask_result;
  // }

  // getTask1(id_to_do): Observable<Task_Interface[]> {
  //   const Task_result = this.http.get<Task_Interface[]>(`${this.Tasks_url}/${id_to_do}`);
  //   return Task_result;
  // }

  // setTask_done(this_task: string): Observable<Task_Interface[]> {
  //   const setTask_done = this.http.post<Task_Interface[]>(`${this.Tasks_url}/task-done/${this_task}`, null);
  //   return setTask_done;
  // }

  // Delete_Task(this_task: string): Observable<Task_Interface[]> {
  //   // console.log(this_task)
  //   return this.http.post<Task_Interface[]>(`${this.Tasks_url}/delete-task/${this_task}`, null)
  // }

  createUser_DB(user: object): Observable<User_Interface[]> {
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/new-user`, user);
    return res;
  }

  getUsers(): Observable<User_Interface[]> {
    const getUsers_result = this.http.get<User_Interface[]>(this.Users_url);
    return getUsers_result;
  }

  logIn(user: object): Observable<User_Interface[]> {
    const res = this.http.post<User_Interface[]>(`${this.Users_url}/user-login`, user);
    return res;
  }


}
