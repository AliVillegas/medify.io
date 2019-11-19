import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { loopbackConnPatientsUrl } from '../loopbackConnectors';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dr-new-appointment-qr',
  templateUrl: './dr-new-appointment-qr.component.html',
  styleUrls: ['./dr-new-appointment-qr.component.scss']
})
export class DrNewAppointmentQRComponent implements OnInit {

  codeFormGroup: FormGroup;
  codeFormControl = new FormControl('');
  loopbackPatientsUrl = loopbackConnPatientsUrl
  errorMessage = ""
  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private fb: FormBuilder,
    private http:HttpClient,
    private _location: Location,
    private router: Router,
    private translationService: TranslateService
  ) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

    this.codeFormGroup = this.fb.group({
      code: ''
    })

  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
    this.navData.changePageLocation(this._location)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }
  onClickSubmit( code:string){
    console.log("TRANS" + this.translationService.getLangs())
    var msgMap = {
      "UserIncorrect" : "Usuario no existe",
      "EmptyField": "Favor de Llenar Campo",
    }
    if(this.translationService.currentLang == 'es'){
      msgMap = {
      "UserIncorrect" : "Usuario no existe",
      "EmptyField": "Favor de Llenar Campo",
      }
    }
    else if(this.translationService.currentLang == 'en'){
      msgMap = {
      "UserIncorrect" : "User not found",
      "EmptyField": "Please fill the input box"
      }
    }
    if(code != "" && code != undefined){
      console.log("Entered CODE")
      this.http.get(this.loopbackPatientsUrl.concat(code)).subscribe(
        data => {
          var redirectString = "dr/appointment/"
          redirectString += code
          this.router.navigateByUrl(redirectString);
        },
        error =>{
          this.errorMessage = msgMap.UserIncorrect
          console.clear()
        }
      );
    }
    else{
      this.errorMessage = msgMap.EmptyField
    }
    
    //href="dr/appointment/create"

  }
}
