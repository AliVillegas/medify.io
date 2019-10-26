import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { Doctor } from '../Models/Doctor';

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
  incorrectUserOrPassword: Boolean = false
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('');

  matcher = new MyErrorStateMatcher();

  @Input() name;
  sub;
  patientsUrl = 'https://api.jsonbin.io/b/5db4a7a8f55f242a12ab2a47/4'
  doctorsUrl = 'https://api.jsonbin.io/b/5db4a7c25366d12a248eccc7/1'

  patients:Patient[]
  doctors:Doctor[]

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.patients = []
    this.doctors = []
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.name = params.get('name') });

    if(this.name == 'doctor'){
      this.http.get(this.doctorsUrl).toPromise().then(data => {
        for(let element in data["doctors"]){
            let doctor =data["doctors"][element]["data"]
            this.doctors.push(new Doctor(doctor["name"],doctor["email"],doctor["password"],doctor["serviceId"], doctor["id"]))
        }
        console.log(this.doctors)
      })
    }
    else if (this.name == 'patient'){
      this.http.get(this.patientsUrl).toPromise().then(data => {
        for(let element in data["patients"]){
            let patient =data["patients"][element]["data"]
            this.patients.push(new Patient(patient["name"],patient["email"],patient["password"], patient["id"]))
        }
        console.log(this.patients)
      })
    }

    
    
  }

  onClickSubmit(email:String, password:String) {
    
      if(this.name == 'patient'){
        this.patients.forEach(patient => {
        if(patient.email == email && patient.password == password){
          this.router.navigateByUrl('patient/dashboard');
        }
        else { 
          // show error (Email or password is incorrect)
        }
      })
      }
      else if (this.name == 'doctor'){
        this.doctors.forEach(doctor => {
          if(doctor.email == email && doctor.password == password){
            this.router.navigateByUrl('dr/dashboard');
          }
          else { 
            // show error (Email or password is incorrect)
          }
        })
      }
    
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginEmail: '',
      loginPassword: ''
    })
  }

}
