import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, MatSelectChange } from '@angular/material/select';

import { Medicine, MEDICINES } from './meds-data';
import { UserdataService } from '../userdata.service';
import { MatOption } from '@angular/material/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Prescription } from '../Models/Prescription';
import { Auth } from 'aws-amplify';
import { ToastServiceService } from '../toast-service.service';
import { loopbackConnMedsUrl, loopbackConnPatientsUrl } from '../loopbackConnectors';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dr-create-prescription',
  templateUrl: './dr-create-prescription.component.html',
  styleUrls: ['./dr-create-prescription.component.scss']
})
export class DrCreatePrescriptionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() search = 'Buscar';
  @Input() noneFound = 'No se encontraron opciones';
  @Input() patientId;
  sub;
  protected medicines: Medicine[] = MEDICINES;
  privatePatientsUrl = 'https://api.jsonbin.io/b/5db648c2fe2f084c49258cb1'
  privateDoctorsUrl = 'https://api.jsonbin.io/b/5db64a818c3b0a4aac6920d9'
  public medControl: FormControl = new FormControl();
  public medFilter: FormControl = new FormControl();
  public location: String
  public userId: String
  public drName: String
  public drEmail: String
  public todaysDate: String
  public institute: String
  public loopbackMedsUrl = loopbackConnMedsUrl;
  public loopbackPatientsUrl = loopbackConnPatientsUrl

  public filteredMeds: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);
  public jsonData;
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  createPrescriptionForm: FormGroup
  prescriptionTitleControl = new FormControl('');
  prescriptionDiagnosisControl = new FormControl('');
  protected _onDestroy = new Subject<void>();
  private selectedMeds: String[]
  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private _location: Location,
    private fb: FormBuilder,
    private userData: UserdataService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastServiceService,
    private translationService: TranslateService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });
    var today = new Date()
    var month = today.getMonth()
    var day = today.getDate()
    var year = today.getFullYear()
    this.todaysDate = ""
    this.todaysDate += day + "/" + (month + 1) + "/" + year;
    Auth.currentSession()
      .then(data => {
        var user = data.getIdToken().decodePayload();
        this.drName = user['custom:name']
        this.institute = "Consultorio " + this.drName
        this.drEmail = user['email']
        this.http.get(this.loopbackMedsUrl).subscribe(
          data => {
            this.medicines = data as Medicine[]
            this.filteredMeds.next(this.medicines.slice());
            this.medFilter.valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterMedsMulti();
              });
          }
        )
      });
    this.userData.currentId.subscribe(id => this.userId = id);

    this.initializeNavbarStatus()
    this.initializeSidebarStatus()



    this.createPrescriptionForm = this.fb.group({
      title: '',
      diagnosis: ''
    })

    this.createPrescriptionForm.valueChanges.subscribe()
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredMeds
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Medicine, b: Medicine) => a && b && a.id === b.id;
      });
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

  protected filterMedsMulti() {
    if (!this.medicines) {
      return;
    }
    // get the search keyword
    let search = this.medFilter.value;
    if (!search) {
      this.filteredMeds.next(this.medicines.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMeds.next(
      this.medicines.filter(medicine => medicine.name.toLowerCase().indexOf(search) > -1)
    );
  }

  onClickSubmit(title: string, diagnosis: string) {
    if (title == "" || title == undefined) {
      return
    }
    if (diagnosis == "" || diagnosis == undefined) {
      return
    }
    console.log(title)
    console.log(diagnosis)
    this.http.get(this.loopbackPatientsUrl.concat(this.patientId)).subscribe(
      data => {
        var patientData = data
        var presTitle = title;
        var presDiagnosis = diagnosis;
        var date = new Date()
        var presDate = ""
        var month = date.getMonth()
        var day = date.getDate()
        var year = date.getFullYear()
        presDate += day + "/" + month + "/" + year;
        var endDate = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
        var endMonth = endDate.getMonth()
        var endDay = endDate.getDate()
        var endYear = endDate.getFullYear()
        var presEndDate = ""
        presEndDate += endDay + "/" + endMonth + "/" + endYear;
        var realMeds = []
        if (this.selectedMeds != undefined && this.selectedMeds.length > 0) {
          this.selectedMeds.forEach(m => {
            realMeds.push({
              "name": m,
              "delivered": "false"
            })
          });
        }

        var msgMapMonth = {
          0: "Ene",
          1: "Feb",
          2: "Mar",
          3: "Abr",
          4: "May",
          5: "Jun",
          6: "Jul",
          7: "Ago",
          8: "Sep",
          9: "Oct",
          10: "Nov",
          11: "Dic"
        }


        var presMonth = msgMapMonth[month]
        var newPrescription = {
          title: presTitle,
          dayNumber: day,
          details: presDiagnosis,
          status: "-",
          date: presDate,
          endDate: presEndDate,
          month: presMonth,
          meds: realMeds,
          doctor: {
            name: this.drName,
            institute: this.institute,
            id: this.drEmail
          }
        }
        console.log(newPrescription)
        patientData['prescriptions'].push(newPrescription)
        this.http.put(this.loopbackPatientsUrl.concat(this.patientId), patientData).subscribe(
          data => {

            this.toastService.changeIsVisible(true)
            var patientName = patientData['name']
            var toastMsg = {
              "msg": "Nueva receta se ha enviado a "

            }
            if (this.translationService.currentLang == 'en') {
              toastMsg = {
                "msg": "New prescription has been sent to "
              }
            }

            toastMsg.msg += patientName
            this.toastService.changeMessage(toastMsg["msg"].toString())
            var redirectString = "dr/dashboard"
            this.router.navigateByUrl(redirectString);
            window.scroll(0, 0);

          }
        )



      },
      error => {
        console.clear()
      }
    );
  }
  onClickSubmitz(title: String, diagnosis: String) {
    if (title != "" && diagnosis != "") {
      let headers = new HttpHeaders()
      headers = headers.set("Content-Type", "application/json");
      headers = headers.set("versioning", "false");
      headers = headers.set("secret-key", "$2b$10$b3F3emDew3JC/JjHy/0Kgulzg1lNfKkhZ1kSrv3Owm58PhkgEOHQm")
      this.http.get(this.privatePatientsUrl, { headers }).toPromise().then(data => {

        var JSONData = data
        var today = new Date();
        var date = today.getDate()
        var fullDate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        var expireDay = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
        var endDate = (expireDay.getMonth() + 1) + '/' + (expireDay.getDate()) + '/' + expireDay.getFullYear();
        /*Make Month map to value */
        var prescriptions = JSONData["patients"][this.patientId]["data"]["prescriptions"]
        var realMeds = []
        this.selectedMeds.forEach(m => {
          realMeds.push({
            "name": m,
            "delivered": "false"
          })
        });
        var prescription = {
          "title": title,
          "details": diagnosis,
          "dayNumber": date,
          "date": fullDate,
          "doctorId": this.userId,
          "endDate": endDate,
          "meds": realMeds,
          "month": "Oct",
          "patientId": this.patientId,
          "status": "Sin Entregar"
        }
        prescriptions[prescriptions.length] = prescription
        this.jsonData = JSONData
        console.log(JSONData)
        this.http.put(this.privatePatientsUrl, JSON.stringify(JSONData), { headers }).toPromise().then(data => {

        })
        this.router.navigateByUrl('dr/dashboard');
      })

    }

  }

  selected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    }
    this.selectedMeds = []
    for (let med in selectedData.value) {
      this.selectedMeds.push(selectedData.value[med].name)
    }
  }

}
