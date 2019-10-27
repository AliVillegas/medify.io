import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { Doctor } from '../Models/Doctor';
import { Appointment } from '../Models/Appointment';
import { UserdataService } from '../userdata.service';
import { Prescription } from '../Models/Prescription';
import { Med } from '../Models/Med';

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
  patient:Patient;
  doctor:Doctor;
  reception:Prescription;
  incorrectUserOrPassword: Boolean = false
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('');

  matcher = new MyErrorStateMatcher();

  @Input() name;
  sub;
  patientsUrl = 'https://api.jsonbin.io/b/5db4a7a8f55f242a12ab2a47/12'
  doctorsUrl = 'https://api.jsonbin.io/b/5db4a7c25366d12a248eccc7/5'

  patients:Patient[]
  doctors:Doctor[]
  appointments:Appointment[]
  prescriptions:Prescription[]
  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userData: UserdataService
  ) {
    this.patients = []
    this.doctors = []
    this.appointments = []
    this.prescriptions =  []
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.name = params.get('name') });
      this.http.get(this.doctorsUrl).toPromise().then(data => {
        for(let element in data["doctors"]){
            let doctor =data["doctors"][element]["data"]
            this.doctors.push(new Doctor(doctor["name"],doctor["email"],doctor["password"],doctor["serviceId"], doctor["institute"],doctor["id"]))
        }
      })
      //console.log(this.doctors)
      this.http.get(this.patientsUrl).toPromise().then(data => {
        for(let element in data["patients"]){
            let patient =data["patients"][element]["data"]
            this.patients.push(new Patient(patient["name"],patient["email"],patient["password"], patient["id"]))
            this.patients[this.patients.length-1].setWeight(patient["weight"])
            this.patients[this.patients.length-1].setHeight(patient["height"])
            this.patients[this.patients.length-1].setBloodType(patient["bloodType"])
            this.patients[this.patients.length-1].setAlergies(patient["alergies"])
            this.patients[this.patients.length-1].setNotes(patient["Notes"])
            this.patients[this.patients.length-1].setCronicDiseases(patient["cronicDiseases"])
            for(let data in patient["prescriptions"]){
              let prescription = patient["prescriptions"][data]
 
              let prescriptionDoctor:Doctor
              this.doctors.forEach(doc => {
                if(doc.getId() == prescription["doctorId"] ){
                    prescriptionDoctor = doc
                }
              })
              var p =  new Prescription(prescription["title"],prescription["dayNumber"],
              prescription["details"],prescription["month"],prescriptionDoctor,
              prescription["endDate"],prescription["id"])
              for(let med in prescription["meds"]){
                  let m = new Med(prescription["meds"][med]["name"],(prescription["meds"][med]["delivered"] == 'true'));
                  p.addMed(m)
              }
              this.patients[this.patients.length-1].addPrescription(p)
                
              }
        }

      })
      //console.log(this.patients)
    }

  onClickSubmit(email:String, password:String) {
    
      if(this.name == 'patient'){
        this.patients.forEach(patient => {
        if(patient.email == email && patient.password == password){
          this.http.get(this.patientsUrl).toPromise().then(data => {
            let fullData =data["patients"][patient.getId() ]["data"]
            var doctor:Doctor;
            for(let data in fullData["appointments"]){
              let appointment = fullData["appointments"][data]
              this.doctors.forEach(doc => {
                if(doc.getId() == appointment["doctorId"] ){
                    doctor = doc
                }
              })
              this.appointments.push(new Appointment(appointment["concept"],appointment["dayName"],
              appointment["dayNumber"],appointment["startTime"], appointment["endTime"],
              appointment["location"], appointment["month"],patient,doctor, appointment["id"]))
            }
            
            this.patient = patient
          //UPDATE USER SERVICE
          this.userData.changeName(patient.name)
          this.userData.changeEmail(patient.email)
          this.userData.changeId(patient.id)
          this.userData.changeUserIsDoctor(false)
          this.userData.changeAppointments(this.appointments)
           this.userData.changePrescriptions(patient.prescriptions)
          this.router.navigateByUrl('patient/dashboard');
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
      else if (this.name == 'doctor'){
        this.doctors.forEach(doctor => {
          if(doctor.email == email && doctor.password == password){
            this.http.get(this.doctorsUrl).toPromise().then(data => {
              let fullData =data["doctors"][doctor.getId()]["data"]
              var patient:Patient;
              for(let data in fullData["appointments"]){
                let appointment = fullData["appointments"][data]
                this.patients.forEach(pat => {
                  if(pat.getId() == appointment["patientId"] ){
                      patient = pat
                  }
                })
                this.appointments.push(new Appointment(appointment["concept"],appointment["dayName"],
                appointment["dayNumber"],appointment["startTime"], appointment["endTime"],
                appointment["location"], appointment["month"],patient,doctor, appointment["id"]))
                //UPDATE USER SERVICE
                this.userData.changeName(doctor.name)
                this.userData.changeEmail(doctor.email)
                this.userData.changeId(doctor.id)
                this.userData.changeUserIsDoctor(true)
                this.userData.changeAppointments(this.appointments)
                this.userData.changeServiceId(doctor.serviceId)
                localStorage.setItem("userName", doctor.name.toString())
                localStorage.setItem("userEmail", doctor.email.toString())
                localStorage.setItem("userId", doctor.id.toString())
                localStorage.setItem("userServiceId", doctor.serviceId.toString())
                localStorage.setItem("appointments", JSON.stringify(this.appointments))
                localStorage.setItem("isDoctor", "true")
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
  }

}
