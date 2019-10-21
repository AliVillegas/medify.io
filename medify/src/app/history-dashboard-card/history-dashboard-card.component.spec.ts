import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDashboardCardComponent } from './history-dashboard-card.component';

describe('HistoryDashboardCardComponent', () => {
  let component: HistoryDashboardCardComponent;
  let fixture: ComponentFixture<HistoryDashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDashboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
