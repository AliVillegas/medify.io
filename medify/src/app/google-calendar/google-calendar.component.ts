import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';

declare var gapi: any;

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrls: ['./google-calendar.component.scss']
})
export class GoogleCalendarComponent implements OnInit {
  public appointments: Appointment[]
  constructor(private userData: UserdataService) {
    this.initClient();
  }

  ngOnInit() {
    this.userData.currentAppointments.subscribe(pres => this.appointments = pres);
  }

  initClient() {
    gapi.load('client:auth2', () => {
      console.log('loaded client')
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
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }

  updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize_button');
    var logoutButton = document.getElementById('signout_button');
    if (isSignedIn) {
      console.log("signed in: " + isSignedIn)
      //Get Google User name 
      var authInstance = gapi.auth2.getAuthInstance()
      var userProfile = authInstance.currentUser.get().getBasicProfile()
      var googleName = document.getElementById('name');
      googleName.innerHTML = "Cuenta de Google: " + userProfile.getName()
      //Update buttons if user is signed in
      authorizeButton.style.display = 'none';
      logoutButton.style.display = 'block';
    }
    else {
      console.log("signed in: " + isSignedIn)
      authorizeButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }

  }

  login(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  logout(event) {
    gapi.auth2.getAuthInstance().signOut();
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
