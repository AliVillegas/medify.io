import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Prescription } from '../Models/Prescription';

@Component({
  selector: 'app-history-detail-card',
  templateUrl: './history-detail-card.component.html',
  styleUrls: ['./history-detail-card.component.scss'],
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
export class HistoryDetailCardComponent implements OnInit {
  private prescriptions:Prescription[]
  constructor(
    private userData:UserdataService
  ) { }

  ngOnInit() {
    
    this.userData.currentPrescriptions.subscribe(pres => this.prescriptions = pres);

  }

}
