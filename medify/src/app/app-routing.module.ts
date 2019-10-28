import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { LoginComponent } from './login/login.component';
import { DrNewAppointmentComponent } from './dr-new-appointment/dr-new-appointment.component';
import { DrDashboardComponent } from './dr-dashboard/dr-dashboard.component';
import { DrPatientInfoComponent } from './dr-patient-info/dr-patient-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrNewAppointmentQRComponent } from './dr-new-appointment-qr/dr-new-appointment-qr.component';
import { DrNewPrescriptionQRComponent } from './dr-new-prescription-qr/dr-new-prescription-qr.component';
import { DrCreatePrescriptionComponent } from './dr-create-prescription/dr-create-prescription.component';
import { AppointmentsDetailComponent } from './appointments-detail/appointments-detail.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { PrescriptionsDetailComponent } from './prescriptions-detail/prescriptions-detail.component';
import { LogoutComponent } from './logout/logout.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'register-patient', component: RegisterPatientComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent },
  { path: 'login/:name', component: LoginComponent },
  { path: 'dr/dashboard', component: DrDashboardComponent },
  { path: 'dr/new-appointment', component: DrNewAppointmentComponent },
  { path: 'dr/patient-info/:patientId', component: DrPatientInfoComponent },
  { path: 'dr/appointment/patient-qr', component: DrNewAppointmentQRComponent },
  { path: 'dr/appointment/create', component: DrNewAppointmentComponent },
  { path: 'dr/prescription/patient-qr/:patientId', component: DrNewPrescriptionQRComponent },
  { path: 'dr/prescription/create/:patientId', component: DrCreatePrescriptionComponent },
  { path: 'patient/dashboard', component: DashboardComponent },
  { path: 'patient/profile', component: PatientProfileComponent },
  { path: 'patient/appointments-detail', component: AppointmentsDetailComponent },
  { path: 'patient/history-detail', component: HistoryDetailComponent },
  { path: 'patient/prescriptions-detail', component: PrescriptionsDetailComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'about', component: AboutComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
