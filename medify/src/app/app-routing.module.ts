import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { LoginComponent } from './login/login.component';
import { DrNewAppointmentComponent } from './dr-new-appointment/dr-new-appointment.component';
import { DrDashboardComponent } from './dr-dashboard/dr-dashboard.component';
import { DrPatientInfoComponent } from './dr-patient-info/dr-patient-info.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
=======
import { DrNewAppointmentQRComponent } from './dr-new-appointment-qr/dr-new-appointment-qr.component';
import { DrNewPrescriptionQRComponent } from './dr-new-prescription-qr/dr-new-prescription-qr.component';
import { DrCreatePrescriptionComponent } from './dr-create-prescription/dr-create-prescription.component';
>>>>>>> 601a47bb9d5e5809a646b8a9aa0f1cfb8917065c


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'register-patient', component: RegisterPatientComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent },
  { path: 'dr/new-appointment', component: DrNewAppointmentComponent },
  { path: 'login/:name', component: LoginComponent },
  { path: 'dr/dashboard', component: DrDashboardComponent },
  { path: 'dr/patient-info', component: DrPatientInfoComponent },
<<<<<<< HEAD
  { path: 'dashboard', component: DashboardComponent }
=======
  { path: 'dr/appointment/patient-qr', component: DrNewAppointmentQRComponent },
  { path: 'dr/appointment/create', component: DrNewAppointmentComponent },
  { path: 'dr/prescription/patient-qr', component: DrNewPrescriptionQRComponent },
  { path: 'dr/prescription/create', component: DrCreatePrescriptionComponent }

>>>>>>> 601a47bb9d5e5809a646b8a9aa0f1cfb8917065c

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
