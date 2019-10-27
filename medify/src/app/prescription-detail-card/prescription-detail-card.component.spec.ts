import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailCardComponent } from './prescription-detail-card.component';

describe('PrescriptionDetailCardComponent', () => {
  let component: PrescriptionDetailCardComponent;
  let fixture: ComponentFixture<PrescriptionDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
