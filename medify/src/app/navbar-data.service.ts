import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarDataService {
  private isLandingPage = new BehaviorSubject<Boolean>(false);
  private isDashboardPage = new BehaviorSubject<Boolean>(false);
  private hasReturnArrow = new BehaviorSubject<Boolean>(false);
  currentIsLanding = this.isLandingPage.asObservable();
  currentDashboard = this.isDashboardPage.asObservable();
  currentBackArrow = this.hasReturnArrow.asObservable();
  constructor() { }

  changeIsLandingPage(isLandingPage: Boolean){
    this.isLandingPage.next(isLandingPage)
  }
  changeIsDashboardPage(isDashboardPage: Boolean){
    this.isDashboardPage.next(isDashboardPage)
  }
  changeHasReturnArrow(hasReturnArrow: Boolean){
    this.hasReturnArrow.next(hasReturnArrow)
  }
}
