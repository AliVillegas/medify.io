import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loopbackConnPatientsUrl, loopbackConnGendersEsUrl, loopbackConnGendersEnUrl } from '../loopbackConnectors';
import { ToastServiceService } from '../toast-service.service';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss']
})
export class NewPatientFormComponent implements OnInit {
  @Input() patientId;
  sub;

  public language: string = 'es';
  public loopbackPatientsUrl = loopbackConnPatientsUrl
  public loopbackGendersUrlEs = loopbackConnGendersEsUrl
  public loopbackGendersUrlEn = loopbackConnGendersEnUrl
  newPatientForm: FormGroup
  bloodType = new FormControl('');
  weight = new FormControl('');
  height = new FormControl('');
  gender = new FormControl('');
  chronicDiseases = new FormControl('');
  alergies = new FormControl('');
  genders:String[]


  constructor(private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private translate: TranslateService,
    private toastService:ToastServiceService,
    ) {
    this.sub = this.activatedRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });

    this.translate.setDefaultLang(this.language);
  }

  ngOnInit() {
    this.genders = []
    this.newPatientForm = this.fb.group({
      title: ''
    })
    var l = localStorage.getItem("language");
    if (l != null)
      this.changeLanguage(l);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem("language", this.translate.currentLang);
    });
    if(this.translate.currentLang == 'es'){
      this.http.get(this.loopbackGendersUrlEs).subscribe(
        genders => {
          var genObjects = genders as String[]; 
          genObjects.forEach(element => {
            this.genders.push(element['nombre'])
          });
        }
      )
    }
    else if(this.translate.currentLang == 'en'){
      this.http.get(this.loopbackGendersUrlEn).subscribe(
        genders => {
          var genObjects = genders as String[]; 
          genObjects.forEach(element => {
            this.genders.push(element['name'])
          });
        }
      )
    }
    
    
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
  }

  onClickSubmit(bloodType: string, weight, height, chronicDiseases: string, alergies: string) {
    var err = document.getElementById("error")
    var l = localStorage.getItem("language")
    if (bloodType != '' && weight != '' && height != '') {
      if (weight > 0 && height > 0) {
        err.innerHTML = ""
        var diseasesList = chronicDiseases.split(",")
        var alergiesList = alergies.split(",")
        this.newPatientData(bloodType, weight, height, diseasesList, alergiesList)
        
      }
      else {
        if (l != null) {
          if (l == "es") {
            err.innerHTML = "Peso y estatura deben ser números positivos. Altura no puede ser mayor a 3m"
          }
          else {
            err.innerHTML = "Weight and Height must be positive numbers. Height can't be more then 3m"
          }
        }
      }
    }
    else {
      if (l != null) {
        if (l == "es") {
          err.innerHTML = "Llene todos los campos"
        }
        else {
          err.innerHTML = "Fill in all the fields"
        }
      }
    }

   

  }

  newPatientData(bloodType, weight, height, chronicDiseases, alergies) {
     //SEND DATA TO LOOPBACK ç
     this.http.get(this.loopbackPatientsUrl.concat(this.patientId)).subscribe(
      data => {
        var patientData = data
        weight += 'kg'
        height += 'm'
        data['weight'] = weight
        data['height'] = height
        data['bloodType'] = bloodType
        data['cronicDiseases'] = chronicDiseases
        data['alergies'] = alergies
        this.http.put(this.loopbackPatientsUrl.concat(this.patientId),patientData).subscribe(
          data =>{
            this.toastService.changeIsVisible(true)
            var patientName = patientData['name']
            var toastMsg = {
              "msg": "Perfil completado éxitosamente "

            }
            if(this.translate.currentLang == 'en'){
              toastMsg = {
                "msg": "Your profile has been succesfully completed"
              }
            }
            this.toastService.changeMessage(toastMsg["msg"].toString())
            var redirectString = "patient/dashboard"
            this.router.navigateByUrl(redirectString);
            window.scroll(0,0);            
            
          }
        )
      }
    );
   }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(true)
    this.navData.changeHasReturnArrow(false)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }
  public changeLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }

}
