import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-appointments-bar',
  templateUrl: './search-appointments-bar.component.html',
  styleUrls: ['./search-appointments-bar.component.scss']
})
export class SearchAppointmentsBarComponent implements OnInit {

  searchForm: FormGroup
  searchField = new FormControl('');

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      title: ''
    })
  }

  searchAppointment(query) {
    var err = document.getElementById("error")
    var l = localStorage.getItem("language")
    if (query === '' || query === ' ') {
      if (l != null) {
        if (l == "es") {
          err.innerHTML = "Debes llenar el campo"
        }
        else {
          err.innerHTML = "You must fill in the field"
        }
      }
    }
    else {
      err.innerHTML = ""
    }
  }

}
