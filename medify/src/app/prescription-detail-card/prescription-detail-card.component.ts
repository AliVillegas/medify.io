import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  state,
  transition,
} from '@angular/animations';


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

  constructor() { }

  ngOnInit() {
  }

}
