import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDoctor: Boolean;
  isPatient: Boolean;

  @Input() name;
  sub;


  constructor(
  private activateRoute: ActivatedRoute,
  private fb:FormBuilder
    ) {

    this.sub = this.activateRoute.paramMap.subscribe(params => { this.name = params.get('name') });
    
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        loginEmail: '',
        loginPassword: ''
    })
  }

}
