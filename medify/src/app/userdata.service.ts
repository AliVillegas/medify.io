import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from './Models/Appointment';
import { HttpClient } from '@angular/common/http';
import Patients from './storedData/Patients.json'
import { Prescription } from './Models/Prescription';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private userIsDoctor = new BehaviorSubject<Boolean>(false);
  private name = new BehaviorSubject<String>("");
  private email = new BehaviorSubject<String>("");
  //private password = new BehaviorSubject<String>("");
  private id = new BehaviorSubject<String>("");
  private serviceId = new BehaviorSubject<String>("");
  private appointments = new BehaviorSubject<Appointment[]>([]);
  private prescriptions = new BehaviorSubject<Prescription[]>([]);

  currentUserIsDoctor = this.userIsDoctor.asObservable();
  currentName = this.name.asObservable();
  currentEmail = this.email.asObservable();
  currentId = this.id.asObservable();
  currentServiceId = this.serviceId.asObservable();
  currentAppointments = this.appointments.asObservable();
  currentPrescriptions = this.prescriptions.asObservable();

  constructor(private http:HttpClient) { 
    this.reloadData()
  }
  
  reloadData(){
    

  }
  changeAppointments(app:Appointment[]){
    this.appointments.next(app)
  }
  changePrescriptions(p:Prescription[]){
    this.prescriptions.next(p)
  }


  changeName(name:String){
    this.name.next(name)
  }
  changeEmail(email:String){
    this.email.next(email)
  }
  changeId(id:String){
    this.id.next(id)
  }
  changeServiceId(sid:String){
    this.serviceId.next(sid)
  }

  changeUserIsDoctor(isDoctor:Boolean){
    this.userIsDoctor.next(isDoctor)
  }


}

