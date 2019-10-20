import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrNewPrescriptionQRComponent } from './dr-new-prescription-qr.component';

describe('DrNewPrescriptionQRComponent', () => {
  let component: DrNewPrescriptionQRComponent;
  let fixture: ComponentFixture<DrNewPrescriptionQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrNewPrescriptionQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrNewPrescriptionQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
