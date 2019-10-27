import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailCardComponent } from './appointment-detail-card.component';

describe('AppointmentDetailCardComponent', () => {
  let component: AppointmentDetailCardComponent;
  let fixture: ComponentFixture<AppointmentDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
