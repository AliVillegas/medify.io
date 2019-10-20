import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToastComponent } from './dashboard-toast.component';

describe('DashboardToastComponent', () => {
  let component: DashboardToastComponent;
  let fixture: ComponentFixture<DashboardToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
