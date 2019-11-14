import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { Doctor } from '../Models/Doctor';
import { Appointment } from '../Models/Appointment';
import { UserdataService } from '../userdata.service';
import { Prescription } from '../Models/Prescription';
import { Med } from '../Models/Med';
import { AmplifyService } from 'aws-amplify-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {
  signUpConfig = {
    header: 'Crear Cuenta',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'username',
        required: true,
        displayOrder: 2,
        type: 'string',
      },
      {
        label: 'Confirmar Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'string',
      },
      {
        label: 'Contraseña',
        key: 'password',
        required: true,
        displayOrder: 4,
        type: 'password'
      },
      {
        label: 'Nombre',
        key: 'custom:name',
        required: true,
        displayOrder: 1,
        type: 'string',
        custom: true
      }
    ]
  }

  loginForm: FormGroup;
  isDoctor: Boolean;
  isPatient: Boolean;
  patient: Patient;
  doctor: Doctor;
  reception: Prescription;
  incorrectUserOrPassword: Boolean = false

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('');


  @Input() name;
  sub;
  patientsUrl = 'https://api.jsonbin.io/b/5db4a7a8f55f242a12ab2a47/13'
  doctorsUrl = 'https://api.jsonbin.io/b/5db4a7c25366d12a248eccc7/5'
  privatePatientsUrl = 'https://api.jsonbin.io/b/5db648c2fe2f084c49258cb1'
  privateDoctorsUrl = 'https://api.jsonbin.io/b/5db64a818c3b0a4aac6920d9'
  patients: Patient[]
  doctors: Doctor[]
  appointments: Appointment[]
  prescriptions: Prescription[]
  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userData: UserdataService,
    private amplifyService: AmplifyService
  ) {
    this.amplifyService = amplifyService;
    this.amplifyService.authStateChange$.subscribe(authState =>
      {
        if (authState.state === "signedIn"){
          if (this.name == 'patient') {
            this.router.navigateByUrl('patient/dashboard');
          }
          else{
            //this.router.navigateByUrl('dr/dashboard');
          }

        }
      })
    this.patients = []
    this.doctors = []
    this.appointments = []
    this.prescriptions = []
    let headers = new HttpHeaders()
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("versioning", "false");
    headers = headers.set("secret-key", "$2b$10$b3F3emDew3JC/JjHy/0Kgulzg1lNfKkhZ1kSrv3Owm58PhkgEOHQm")


    this.sub = this.activateRoute.paramMap.subscribe(params => { this.name = params.get('name') });
    this.http.get(this.privateDoctorsUrl,{headers}).toPromise().then(data => {
      for (let element in data["doctors"]) {
        let doctor = data["doctors"][element]["data"]
        this.doctors.push(new Doctor(doctor["name"], doctor["email"], doctor["password"], doctor["serviceId"], doctor["institute"], doctor["id"]))
      }

      this.http.get(this.privatePatientsUrl,{headers}).toPromise().then(data => {
        for (let element in data["patients"]) {
          let patient = data["patients"][element]["data"]
          this.patients.push(new Patient(patient["name"], patient["email"], patient["password"], patient["id"]))
          this.patients[this.patients.length - 1].setWeight(patient["weight"])
          this.patients[this.patients.length - 1].setHeight(patient["height"])
          this.patients[this.patients.length - 1].setBloodType(patient["bloodType"])
          this.patients[this.patients.length - 1].setAlergies(patient["alergies"])
          this.patients[this.patients.length - 1].setNotes(patient["Notes"])
          this.patients[this.patients.length - 1].setCronicDiseases(patient["cronicDiseases"])
          for (let data in patient["prescriptions"]) {
            let prescription = patient["prescriptions"][data]
            var prescriptionDoctor: Doctor;
            this.doctors.forEach(doc => {
              if (doc.id == prescription["doctorId"]) {
                prescriptionDoctor = doc
              }
            })
            //console.log(prescriptionDoctor)
  
            var p = new Prescription(prescription["title"], prescription["dayNumber"],
              prescription["details"], prescription["month"], prescriptionDoctor,
              prescription["date"],prescription["endDate"], prescription["id"])
              p.setStatus(prescription["status"])
              for (let med in prescription["meds"]) {
              let m = new Med(prescription["meds"][med]["name"], (prescription["meds"][med]["delivered"] == 'true'));
              p.addMed(m)
            }
            this.patients[this.patients.length - 1].addPrescription(p)
  
          }
        }
  
      })
      
    })
    //console.log(this.doctors)
    
    //console.log(this.patients)
  }

  onClickSubmit(email: String, password: String) {
    let headers = new HttpHeaders()
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("versioning", "false");
    headers = headers.set("secret-key", "$2b$10$b3F3emDew3JC/JjHy/0Kgulzg1lNfKkhZ1kSrv3Owm58PhkgEOHQm")

    if (this.name == 'patient') {
      this.patients.forEach(patient => {
        if (patient.email == email && patient.password == password) {
          this.http.get(this.privatePatientsUrl,{headers}).toPromise().then(data => {
            let fullData = data["patients"][patient.getId()]["data"]
            var doctor: Doctor;
            for (let data in fullData["appointments"]) {
              let appointment = fullData["appointments"][data]
              this.doctors.forEach(doc => {
                if (doc.getId() == appointment["doctorId"]) {
                  doctor = doc
                }
              })
              this.appointments.push(new Appointment(appointment["concept"], appointment["dayName"],
                appointment["dayNumber"], appointment["startTime"], appointment["endTime"],
                appointment["location"], appointment["month"], patient, doctor, appointment["id"]))
            }

            this.patient = patient
            //UPDATE USER SERVICE
            this.userData.changeName(patient.name)
            this.userData.changeEmail(patient.email)
            this.userData.changeId(patient.id)
            this.userData.changeUserIsDoctor(false)
            this.userData.changeAppointments(this.appointments)
            this.userData.changePrescriptions(patient.prescriptions)
            this.userData.changePatient(patient)
            this.router.navigateByUrl('patient/dashboard');
            localStorage.setItem("patient", JSON.stringify(patient))
            localStorage.setItem("userName", patient.name.toString())
            localStorage.setItem("userEmail", patient.email.toString())
            localStorage.setItem("userId", patient.id.toString())
            localStorage.setItem("appointments", JSON.stringify(this.appointments))
            localStorage.setItem("prescriptions", JSON.stringify(patient.prescriptions))
            localStorage.setItem("isDoctor", "false")
          })

        }
        else {
          // show error (Email or password is incorrect)
        }
      })
    }
    else if (this.name == 'doctor') {
      this.doctors.forEach(doctor => {
        if (doctor.email == email && doctor.password == password) {
          this.http.get(this.privateDoctorsUrl, {headers}).toPromise().then(data => {
            let fullData = data["doctors"][doctor.getId()]["data"]
            var patient: Patient;
            for (let data in fullData["appointments"]) {
              let appointment = fullData["appointments"][data]
              this.patients.forEach(pat => {
                if (pat.getId() == appointment["patientId"]) {
                  patient = pat
                }
              })
              this.appointments.push(new Appointment(appointment["concept"], appointment["dayName"],
                appointment["dayNumber"], appointment["startTime"], appointment["endTime"],
                appointment["location"], appointment["month"], patient, doctor, appointment["id"]))
              //UPDATE USER SERVICE
              this.userData.changeName(doctor.name)
              this.userData.changeEmail(doctor.email)
              this.userData.changeId(doctor.id)
              this.userData.changeUserIsDoctor(true)
              this.userData.changeAppointments(this.appointments)
              this.userData.changeServiceId(doctor.serviceId)
              this.userData.changeDoctor(doctor)
              localStorage.setItem("userName", doctor.name.toString())
              localStorage.setItem("userEmail", doctor.email.toString())
              localStorage.setItem("userId", doctor.id.toString())
              localStorage.setItem("userServiceId", doctor.serviceId.toString())
              localStorage.setItem("appointments", JSON.stringify(this.appointments))
              localStorage.setItem("isDoctor", "true")
              localStorage.setItem("doctor", JSON.stringify(doctor))
            }
          })
          this.doctor = doctor


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

    if(this.name == 'doctor'){
      this.signUpConfig.signUpFields.push(
        {
            label: 'Cédula',
            key: 'custom:serviceId',
            required: true,
            displayOrder: 5,
            type: 'string',
            custom: true
          }
      )
    }
  }

}
