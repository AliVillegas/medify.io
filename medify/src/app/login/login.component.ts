import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isDoctor: Boolean;
  isPatient: Boolean;
  @Input() name;
  sub;


  constructor(private activateRoute: ActivatedRoute) {

    this.sub = this.activateRoute.paramMap.subscribe(params => { this.name = params.get('name') });

  }

  ngOnInit() {
  }

}
