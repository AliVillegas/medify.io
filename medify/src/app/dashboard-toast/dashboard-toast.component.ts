import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-dashboard-toast',
  templateUrl: './dashboard-toast.component.html',
  styleUrls: ['./dashboard-toast.component.scss']
})
export class DashboardToastComponent implements OnInit {
  public toastTime: String = "Hace unos segundos"
  public toastMessage: String = "¡Felicidades! Has completado tu perfil. Ahora puedes usar Medify."
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.toast').toast('show');
    });
  }

}
