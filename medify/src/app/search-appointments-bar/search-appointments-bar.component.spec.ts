import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAppointmentsBarComponent } from './search-appointments-bar.component';

describe('SearchAppointmentsBarComponent', () => {
  let component: SearchAppointmentsBarComponent;
  let fixture: ComponentFixture<SearchAppointmentsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAppointmentsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAppointmentsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
