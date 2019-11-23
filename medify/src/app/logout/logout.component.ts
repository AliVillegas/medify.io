import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      window.location.href = "landing";
    }, 1500);

  }

}
