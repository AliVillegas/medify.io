import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  public modalTitle: String = "Mi código";
  public codeIs:String = "Tu código es:"
  public modalFooter: String = "Cerrar";
  public message:String = "Enseñalo a tu doctor para que pueda registrar una cita o recetar medicamentos.  "
  public email: String

  constructor(private translationService:TranslateService) { }

  ngOnInit() {
    this.email = localStorage.getItem('userEmail')
    this.translationService.onLangChange.subscribe((event: LangChangeEvent) => {

      if(this.translationService.currentLang == 'en'){
        this.modalTitle = "My code"
        this.codeIs = "Your code is:"
        this.modalFooter = "Close"
        this.message = "Show this to your doctor to receive new appointments and prescriptions"
      }
      else if (this.translationService.currentLang == 'es'){
        this.modalFooter = "Cerrar"
        this.modalTitle = "Mi código"
        this.message = "Enseñalo a tu doctor para que pueda registrar una cita o recetar medicamentos.  "
        this.codeIs =  "Tu código es:"
      }
    });
  }

}
