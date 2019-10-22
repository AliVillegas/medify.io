import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  private name: String;
  private email: String;
  private dateBorn: String;
  private bloodType: String;
  constructor() { }

  ngOnInit() {
    this.name = "Juan Perez";
    this.email = "juanp12@gmail.com"
    this.dateBorn = "25/08/1696";
    this.bloodType = "O-"
  }

}
