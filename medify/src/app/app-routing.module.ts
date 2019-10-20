import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { LoginPatientComponent } from './login-patient/login-patient.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { DrNewAppointmentComponent } from './dr-new-appointment/dr-new-appointment.component';
import { DrDashboardComponent } from './dr-dashboard/dr-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'register-patient', component: RegisterPatientComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent },
  { path: 'login-patient', component: LoginPatientComponent },
  { path: 'login-doctor', component: LoginDoctorComponent },
  { path: 'dr/new-appointment', component: DrNewAppointmentComponent },
  { path: 'dr/dashboard', component: DrDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
