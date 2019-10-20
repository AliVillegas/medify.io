import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarDataService {

  private isDoctor = new BehaviorSubject<Boolean>(false);
  private isPatient = new BehaviorSubject<Boolean>(false);
  private isLandingPage = new BehaviorSubject<Boolean>(false);
  currentIsLandingPage = this.isLandingPage.asObservable();
  currentIsDoctor = this.isDoctor.asObservable();
  currentIsPatient = this.isPatient.asObservable();
  constructor() { }

  changeIsLandingPage(isLandingPage: Boolean){
    this.isLandingPage.next(isLandingPage)
  }
  changeIsDoctor(isDoctor: Boolean){
    this.isDoctor.next(isDoctor)
  }
  changeIsPatient(isPatient: Boolean){
    this.isPatient.next(isPatient)
  }

}