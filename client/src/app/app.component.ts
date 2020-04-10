import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from './services/data/data.service';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('stickyMenu', null) menuElement: ElementRef;
  elementPosition: any;
  public sticky: boolean = false;
  public userName: string;

  constructor(
    private data_service: DataService,
    private main_service: MainService
  ) { }

  ngOnInit() {
    this.data_service.user_name_from_service.subscribe(data => {
      if (!data) {
        this.userName = 'Please, Sign In';
      } else {
        this.userName = 'Hi, ' + data;
        console.log('1')
      }
    });
    this.main_service.getUser_cart(JSON.parse(localStorage.getItem('268431621_u'))._id)
      .subscribe(data => localStorage.setItem('w_345436583_l', JSON.stringify(data)))
    this.data_service.getTotalPrice();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}