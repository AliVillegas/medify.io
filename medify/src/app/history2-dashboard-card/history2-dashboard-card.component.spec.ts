import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { History2DashboardCardComponent } from './history2-dashboard-card.component';

describe('History2DashboardCardComponent', () => {
  let component: History2DashboardCardComponent;
  let fixture: ComponentFixture<History2DashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ History2DashboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(History2DashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
