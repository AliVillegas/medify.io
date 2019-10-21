import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavbarDataService {
  private isLandingPage = new BehaviorSubject<Boolean>(false);
  private isDashboardPage = new BehaviorSubject<Boolean>(false);
  private hasReturnArrow = new BehaviorSubject<Boolean>(false);
  private pageLocation: BehaviorSubject<Location>
  currentPageLocation:Observable<Location>
  currentIsLanding = this.isLandingPage.asObservable();
  currentDashboard = this.isDashboardPage.asObservable();
  currentBackArrow = this.hasReturnArrow.asObservable();
  constructor(_location:Location) {
    this.pageLocation = new BehaviorSubject<Location>(_location)
    this.currentPageLocation = this.pageLocation.asObservable();

   }

  changeIsLandingPage(isLandingPage: Boolean){
    this.isLandingPage.next(isLandingPage)
  }
  changeIsDashboardPage(isDashboardPage: Boolean){
    this.isDashboardPage.next(isDashboardPage)
  }
  changeHasReturnArrow(hasReturnArrow: Boolean){
    this.hasReturnArrow.next(hasReturnArrow)
  }
  changePageLocation(location: Location){
    this.pageLocation.next(location)

  }


}
