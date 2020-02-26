import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public users_db: Array<any>;
  public new_task: Object;
  public new_task_user: string;
  public new_task_text: string;
  public res: any;

  constructor(private main_service: MainService) { }

  ngOnInit() {
    this.main_service.getUsers()
      .subscribe(data => this.users_db = data);
  }

  createNewTask() {
    this.new_task = {
      text: this.new_task_text,
      user_to_do: this.new_task_user
    }
    this.main_service.saveTask(this.new_task)
      .subscribe(data => this.res = data)
  }

}
