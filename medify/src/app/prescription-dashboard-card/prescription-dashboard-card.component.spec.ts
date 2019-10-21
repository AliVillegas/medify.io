import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDashboardCardComponent } from './prescription-dashboard-card.component';

describe('PrescriptionDashboardCardComponent', () => {
  let component: PrescriptionDashboardCardComponent;
  let fixture: ComponentFixture<PrescriptionDashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionDashboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
