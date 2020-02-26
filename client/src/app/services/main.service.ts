import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task_Interface } from '../interfaces/task';
import { Observable } from 'rxjs';
import { User_Interface } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Tasks_url: string = 'http://localhost:5001/to-do-list';
  private Users_url: string = 'http://localhost:5001/user';

  constructor(
    private http: HttpClient
  ) { }

  getTasks_DB(): Observable<Task_Interface[]> {
    const getTasks_result = this.http.get<Task_Interface[]>(this.Tasks_url);
    return getTasks_result;
  }

  getUsers(): Observable<User_Interface[]> {
    const getUsers_result = this.http.get<User_Interface[]>(this.Users_url);
    return getUsers_result;
  }

  saveTask(to_do): Observable<Task_Interface[]> {
    const saveTask_result = this.http.post<Task_Interface[]>(`${this.Tasks_url}/new-task`, (to_do));
    return saveTask_result;
  }

  getTask1(id_to_do): Observable<Task_Interface[]> {
    const Task_result = this.http.get<Task_Interface[]>(`${this.Tasks_url}/${id_to_do}`);
    return Task_result;
  }

  setTask_done(this_task: string): Observable<Task_Interface[]> {
    const setTask_done = this.http.post<Task_Interface[]>(`${this.Tasks_url}/task-done/${this_task}`, null);
    return setTask_done;
  }

  Delete_Task(this_task: string): Observable<Task_Interface[]> {
    console.log(this_task)
    return this.http.post<Task_Interface[]>(`${this.Tasks_url}/delete-task/${this_task}`, null)
  }


}
