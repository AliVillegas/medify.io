import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboardCardComponent } from './appointment-dashboard-card.component';

describe('AppointmentDashboardCardComponent', () => {
  let component: AppointmentDashboardCardComponent;
  let fixture: ComponentFixture<AppointmentDashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDashboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
