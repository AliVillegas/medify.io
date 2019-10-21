import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrCreatePrescriptionComponent } from './dr-create-prescription.component';

describe('DrCreatePrescriptionComponent', () => {
  let component: DrCreatePrescriptionComponent;
  let fixture: ComponentFixture<DrCreatePrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrCreatePrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrCreatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
