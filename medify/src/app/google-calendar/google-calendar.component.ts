import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { ToastServiceService } from '../toast-service.service';

declare var gapi: any;
declare var $;

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {
  public appointments: Appointment[]
  public events = []
  constructor(private userData: UserdataService, private toastService: ToastServiceService) {
    this.initClient();
  }

  ngOnInit() {
    this.userData.currentAppointments.subscribe(apps => {

      this.appointments = apps
      for (var i = 0; i < this.appointments.length; i++) {
        let date = new Date();

        const startTime = this.convertTime12to24(this.appointments[i].startTime);
        const endTime = this.convertTime12to24(this.appointments[i].endTime);

        const monthName = this.appointments[i].month;
        const monthNumber = this.getMonthFromString(monthName)
        const day = this.appointments[i].dayNumber;

        let startTimeGoogle = date.getFullYear() + "-" + monthNumber + "-" + day + "T" + startTime;
        let endTimeGoogle = date.getFullYear() + "-" + monthNumber + "-" + day + "T" + endTime;

        let isDoctor = localStorage.getItem("isDoctor")

        if (isDoctor === 'true') {
          let event = {
            'summary': this.appointments[i].concept,
            'description': 'Cita médica con: ' + this.appointments[i].patient.name,
            'start': {
              'dateTime': startTimeGoogle,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
              'dateTime': endTimeGoogle,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
          }
          this.events.push(event)
        }
        else {
          let event = {
            'summary': this.appointments[i].concept,
            'description': 'Cita médica con: ' + this.appointments[i].doctor.name,
            'start': {
              'dateTime': startTimeGoogle,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
              'dateTime': endTimeGoogle,
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
          }
          this.events.push(event)
        }

      }

    });
  }

  initClient() {
    gapi.load('client:auth2', () => {
      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyBHnCuI4unuStxbOZqO--pX2lbb6n0AaW4',
        clientId: '430639579430-s8vg01qua4i4fnokijqsuk7hlktilrkp.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      }).then(() => {
        //Sign in state listener
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        var authorizeButton = document.getElementById('authorize_button');
        authorizeButton.onclick = this.login;
        var logoutButton = document.getElementById('signout_button');
        logoutButton.onclick = this.logout;
        //var insertButton = document.getElementById('insert_button');
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }

  updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize_button');
    var logoutButton = document.getElementById('signout_button');
    var insertButton = document.getElementById('insert_button');
    if (isSignedIn) {
      //console.log("signed in: " + isSignedIn)
      //Get Google User name 
      var authInstance = gapi.auth2.getAuthInstance()
      var userProfile = authInstance.currentUser.get().getBasicProfile()
      var googleName = document.getElementById('name');
      googleName.innerHTML = "Cuenta de Google: " + userProfile.getName()
      //Update buttons if user is signed in
      authorizeButton.style.display = 'none';
      logoutButton.style.display = 'block';
      insertButton.style.display = 'block';
    }
    else {
      //console.log("signed in: " + isSignedIn)
      authorizeButton.style.display = 'block';
      logoutButton.style.display = 'none';
      insertButton.style.display = 'none';
    }

  }

  login(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  logout(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  }

  async insertEvents() {
    for (let i = 0; i < this.events.length; i++) {
      const insert = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': this.events[i]
      })
    }

    this.toastService.changeIsVisible(true)
    let message = {
      "msg": "Citas añadidas éxitosamente a google calendar "
    }
    if (localStorage.getItem('language') == 'en') {
      message = {
        "msg": "Appointments succesfully added to google calendar"
      }
    }
    this.toastService.changeMessage(message["msg"].toString())
    $('.toast').toast('show');
    //this.toastService.changeIsVisible(false)

  }

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })

    console.log(events)


  }

}
