import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from './Models/Appointment';

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

  currentUserIsDoctor = this.userIsDoctor.asObservable();
  currentName = this.name.asObservable();
  currentEmail = this.email.asObservable();
  currentId = this.id.asObservable();
  currentServiceId = this.serviceId.asObservable();
  currentAppointments = this.appointments.asObservable();

  constructor() { }
  
  changeAppointments(app:Appointment[]){
    this.appointments.next(app)
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

