import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselLandingComponent } from './carousel-landing/carousel-landing.component';
import { Section1LandingComponent } from './section1-landing/section1-landing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { Section2LandingComponent } from './section2-landing/section2-landing.component';
import { Section3LandingComponent } from './section3-landing/section3-landing.component';
import { Section4LandingComponent } from './section4-landing/section4-landing.component';
import { Section5LandingComponent } from './section5-landing/section5-landing.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { DrNewAppointmentComponent } from './dr-new-appointment/dr-new-appointment.component';
import { DrDashboardComponent } from './dr-dashboard/dr-dashboard.component';
import { DrDashboardCardComponent } from './dr-dashboard-card/dr-dashboard-card.component';
import { DashboardToastComponent } from './dashboard-toast/dashboard-toast.component';
import { DrNewAppointmentQRComponent } from './dr-new-appointment-qr/dr-new-appointment-qr.component';
import { DrPatientInfoComponent } from './dr-patient-info/dr-patient-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QrModalComponent } from './qr-modal/qr-modal.component';
import { PrescriptionDashboardCardComponent } from './prescription-dashboard-card/prescription-dashboard-card.component';
import { HistoryDashboardCardComponent } from './history-dashboard-card/history-dashboard-card.component';
import { History2DashboardCardComponent } from './history2-dashboard-card/history2-dashboard-card.component';
import { AppointmentDashboardCardComponent } from './appointment-dashboard-card/appointment-dashboard-card.component';
import { DrCreatePrescriptionComponent } from './dr-create-prescription/dr-create-prescription.component';
import { DrNewPrescriptionQRComponent } from './dr-new-prescription-qr/dr-new-prescription-qr.component';
import { AppointmentsDetailComponent } from './appointments-detail/appointments-detail.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { PrescriptionsDetailComponent } from './prescriptions-detail/prescriptions-detail.component';
import { LogoutComponent } from './logout/logout.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component'
import { BarChartComponent } from './bar-chart/bar-chart.component';

import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const material = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  BrowserAnimationsModule,
  NgxMaterialTimepickerModule,
  NgxMatSelectSearchModule,
  MatSelectModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    CarouselLandingComponent,
    Section1LandingComponent,
    LandingPageComponent,
    Section2LandingComponent,
    Section3LandingComponent,
    Section4LandingComponent,
    Section5LandingComponent,
    FooterComponent,
    LoginComponent,
    RegisterPatientComponent,
    RegisterDoctorComponent,
    DrNewAppointmentComponent,
    DrDashboardComponent,
    DrDashboardCardComponent,
    DashboardToastComponent,
    DrNewAppointmentQRComponent,
    DrPatientInfoComponent,
    DashboardComponent,
    QrModalComponent,
    PrescriptionDashboardCardComponent,
    HistoryDashboardCardComponent,
    History2DashboardCardComponent,
    AppointmentDashboardCardComponent,
    DrCreatePrescriptionComponent,
    DrNewPrescriptionQRComponent,
    AppointmentsDetailComponent,
    HistoryDetailComponent,
    PrescriptionsDetailComponent,
    PatientProfileComponent,
    LogoutComponent,
    BarChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    material,
    NgxSpinnerModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [material],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
