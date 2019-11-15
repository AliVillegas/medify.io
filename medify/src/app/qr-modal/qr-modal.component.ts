import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  public modalTitle: String = "Mi código";
  public modalFooter: String = "Cerrar";


  constructor() { }

  ngOnInit() {
  }

}
