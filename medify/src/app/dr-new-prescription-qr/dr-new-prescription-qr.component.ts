import { Component, OnInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { loopbackConnPatientsUrl } from '../loopbackConnectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dr-new-prescription-qr',
  templateUrl: './dr-new-prescription-qr.component.html',
  styleUrls: ['./dr-new-prescription-qr.component.scss']
})
export class DrNewPrescriptionQRComponent implements OnInit {
  @Input() patientId;
  sub;
  codeFormGroup: FormGroup;
  codeFormControl = new FormControl('');
  loopbackPatientsUrl = loopbackConnPatientsUrl
  errorMessage: string
  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private _location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private translationService: TranslateService,
    private router: Router

  ) { }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });

    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

    this.codeFormGroup = this.fb.group({
      code: ''
    })

  }


  onClickSubmit(code: string) {
    console.log("TRANS" + this.translationService.getLangs())
    var msgMap = {
      "UserIncorrect": "Usuario no existe",
      "EmptyField": "Favor de Llenar Campo",
    }
    if (this.translationService.currentLang == 'es') {
      msgMap = {
        "UserIncorrect": "Usuario no existe",
        "EmptyField": "Favor de llenar el campo",
      }
    }
    else if (this.translationService.currentLang == 'en') {
      msgMap = {
        "UserIncorrect": "User not found",
        "EmptyField": "Please fill the input box"
      }
    }
    if (code != "" && code != undefined) {
      console.log("Entered CODE")
      this.http.get(this.loopbackPatientsUrl.concat(code)).subscribe(
        data => {
          var redirectString = "dr/prescription/"
          redirectString += code
          this.router.navigateByUrl(redirectString);
        },
        error => {
          this.errorMessage = msgMap.UserIncorrect
          console.clear()
        }
      );
    }
    else {
      this.errorMessage = msgMap.EmptyField
    }

    //href="dr/appointment/create"

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
}
