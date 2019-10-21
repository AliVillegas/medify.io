import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  private modalTitle: String = "Tu código QR";
  private modalFooter: String = "Cerrar";


  constructor() { }

  ngOnInit() {
  }

}
