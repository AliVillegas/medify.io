import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrDashboardCardComponent } from './dr-dashboard-card.component';

describe('DrDashboardCardComponent', () => {
  let component: DrDashboardCardComponent;
  let fixture: ComponentFixture<DrDashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrDashboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
