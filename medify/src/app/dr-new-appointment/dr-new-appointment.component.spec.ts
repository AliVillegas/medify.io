import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrNewAppointmentComponent } from './dr-new-appointment.component';

describe('DrNewAppointmentComponent', () => {
  let component: DrNewAppointmentComponent;
  let fixture: ComponentFixture<DrNewAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrNewAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
