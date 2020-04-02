import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('stickyMenu', null) menuElement: ElementRef;
  elementPosition: any;
  public sticky: boolean = false;

  public user_data: Array<any>;
  public userName: string;

  constructor(
    private data_service: DataService
  ) { }

  ngOnInit() {
    this.data_service.user_name_from_service.subscribe(data => {
      if (data === '') {
        this.userName = 'no user loged-in';
      } else {
        this.userName = 'Hi, ' + data;
      }
    });
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