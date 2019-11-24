import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-new-patient-form',
  templateUrl: './new-patient-form.component.html',
  styleUrls: ['./new-patient-form.component.scss']
})
export class NewPatientFormComponent implements OnInit {
  public language: string = 'es';

  newPatientForm: FormGroup
  bloodType = new FormControl('');
  weight = new FormControl('');
  height = new FormControl('');
  chronicDiseases = new FormControl('');
  alergies = new FormControl('');



  constructor(private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private fb: FormBuilder,
    private translate: TranslateService) {
    this.translate.setDefaultLang(this.language);
  }

  ngOnInit() {
    this.newPatientForm = this.fb.group({
      title: ''
    })
    var l = localStorage.getItem("language");
    if (l != null)
      this.changeLanguage(l);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem("language", this.translate.currentLang);
    });
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
  }

  onClickSubmit(bloodType: string, weight, height, chronicDiseases: string, alergies: string) {
    var err = document.getElementById("error")
    var l = localStorage.getItem("language")
    if (bloodType != '' && weight != '' && height != '' && chronicDiseases != '' && alergies != '') {
      if (weight > 0 && height > 0) {
        err.innerHTML = ""
        var diseasesList = chronicDiseases.split(",")
        var alergiesList = alergies.split(",")
        this.newPatientData(bloodType, weight, diseasesList, alergiesList)
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

  newPatientData(bloodType, weight, height, chronicDiseases, alergies) { }

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
