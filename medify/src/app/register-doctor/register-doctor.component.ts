import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {
  registerDoctorForm: FormGroup
  constructor(private fb:FormBuilder
    ) {
    
  }
  ngOnInit() {

  this.registerDoctorForm = this.fb.group({
      email: '',
      password: '',
      name: '',
      drId: ''
  })

  this.registerDoctorForm.valueChanges.subscribe()
  }


}
