import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../toast-service.service';

declare var $;
@Component({
  selector: 'app-dashboard-toast',
  templateUrl: './dashboard-toast.component.html',
  styleUrls: ['./dashboard-toast.component.scss']
})
export class DashboardToastComponent implements OnInit {
  public toastTime: String = "Hace unos segundos"
  public show:Boolean = false; 
  public toastMessage: String = "¡Felicidades! Has completado tu perfil. Ahora puedes usar Medify."
  constructor(private toastService:ToastServiceService) { 
    this.toastService.currentMessage.subscribe(message => this.toastMessage = message);
    this.toastService.currentIsVisible.subscribe(visible => this.show = visible);

  }
  ngOnInit() {

    if(this.show == true){
      $(document).ready(function () {
        $('.toast').toast('show');
      });
    }
    this.toastService.changeIsVisible(false)

  }

}
