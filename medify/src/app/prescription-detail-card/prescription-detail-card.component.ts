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
  constructor(
    private userData: UserdataService
  ) { }

  ngOnInit() {
    this.userData.currentPrescriptions.subscribe(pres => this.prescriptions = pres);
    console.log(this.userData.currentPrescriptions)

  }

  changeDeliveryStatus(presIndex, medInPresIndex) {
    let pres = this.prescriptions[presIndex];
    let med = pres.meds[medInPresIndex];
    if (med.delivered) {
      this.prescriptions[presIndex].meds[medInPresIndex].delivered = false;
    }
    else {
      this.prescriptions[presIndex].meds[medInPresIndex].delivered = true;
    }

    console.log(pres);
    console.log(med);


    //location.reload();
  }


}
