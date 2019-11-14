import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})

export class RegisterPatientComponent implements OnInit {
  registerPatientForm: FormGroup
  constructor(private fb:FormBuilder) {}
  
  ngOnInit() {
    this.registerPatientForm = this.fb.group({
        email: '',
        password: '',
        name: '',
    });
    this.registerPatientForm.valueChanges.subscribe()
  }

  

}
