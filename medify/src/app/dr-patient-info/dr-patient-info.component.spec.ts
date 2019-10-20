import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrPatientInfoComponent } from './dr-patient-info.component';

describe('DrPatientInfoComponent', () => {
  let component: DrPatientInfoComponent;
  let fixture: ComponentFixture<DrPatientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrPatientInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
