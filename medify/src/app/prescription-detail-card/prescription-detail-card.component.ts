import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition,
} from '@angular/animations';
import { Prescription } from '../Models/Prescription';
import { UserdataService } from '../userdata.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loopbackConnPatientsUrl } from '../loopbackConnectors';
import { Appointment } from '../Models/Appointment';
import { ToastServiceService } from '../toast-service.service';
import { Med } from '../Models/Med';


declare var $;
@Component({
  selector: 'app-prescription-detail-card',
  templateUrl: './prescription-detail-card.component.html',
  styleUrls: ['./prescription-detail-card.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('450ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class PrescriptionDetailCardComponent implements OnInit {
  public prescriptions: Prescription[]
  loopbackPatientsUrl = loopbackConnPatientsUrl

  constructor(
    private userData: UserdataService,
    private http:HttpClient,
    private toastService:ToastServiceService
  ) { }

  ngOnInit() {
    this.userData.currentPrescriptions.subscribe(pres => this.prescriptions = pres);
    this.http.get(loopbackConnPatientsUrl.concat(localStorage.getItem('userEmail'))).subscribe(
      data=>{
        this.prescriptions = data['prescriptions']
      })
    console.log(this.userData.currentPrescriptions)

  }

  changeDeliveryStatus(presIndex, medInPresIndex) {
    let pres = this.prescriptions[presIndex];
    let med = pres.meds[medInPresIndex];
    this.http.get(loopbackConnPatientsUrl.concat(localStorage.getItem('userEmail'))).subscribe(
      data=>{
      var prescriptions = data['prescriptions'];  
      var editedPres = prescriptions[presIndex] as Prescription
      var meds = editedPres.meds as Med[]
      var editMed:any = meds[medInPresIndex]       
      console.log("CLICKED CURRENT" + editMed.delivered) 
      console.log("CLICKED NEW" + editMed.delivered) 
      if (editMed.delivered == 'true') {
        editMed.delivered = 'false'
        data['prescriptions'] = prescriptions
        this.http.put(this.loopbackPatientsUrl.concat(localStorage.getItem('userEmail')),data).subscribe(
          data =>{
            console.log("Success put")
            this.prescriptions[presIndex].meds[medInPresIndex].delivered = false;
            location.reload();
            console.log(pres);
            console.log(med);
          }
        )

      }
      else if(editMed.delivered == 'false') {
        editMed.delivered = 'true'
        data['prescriptions'] = prescriptions
        console.log(prescriptions)
        this.http.put(this.loopbackPatientsUrl.concat(localStorage.getItem('userEmail')),data).subscribe(
          data =>{
            console.log("Success put")
            this.prescriptions[presIndex].meds[medInPresIndex].delivered = true;
            location.reload();
            console.log(pres);
            console.log(med);
          }
        )
      }
    

    })
  


    //location.reload();
  }


}
