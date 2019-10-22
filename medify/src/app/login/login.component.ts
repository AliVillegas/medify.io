import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDoctor: Boolean;
  isPatient: Boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  @Input() name;
  sub;


  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
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
