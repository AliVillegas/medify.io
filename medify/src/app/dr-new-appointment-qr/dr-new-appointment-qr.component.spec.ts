import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrNewAppointmentQRComponent } from './dr-new-appointment-qr.component';

describe('DrNewAppointmentQRComponent', () => {
  let component: DrNewAppointmentQRComponent;
  let fixture: ComponentFixture<DrNewAppointmentQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrNewAppointmentQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrNewAppointmentQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
