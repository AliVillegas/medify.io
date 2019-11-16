import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctor } from './Models/Doctor';
import { Patient } from './Models/Patient';
import { Appointment } from './Models/Appointment';
import { Prescription } from './Models/Prescription';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
   private isVisible = new BehaviorSubject<Boolean>(false);
  private message = new BehaviorSubject<String>("");
  currentIsVisible = this.isVisible.asObservable();
  currentMessage = this.message.asObservable();
  constructor() { 
  }

  changeIsVisible( visible:Boolean){
    this.isVisible.next(visible)
  }
  changeMessage(msg:String){
    this.message.next(msg)
  }

}
