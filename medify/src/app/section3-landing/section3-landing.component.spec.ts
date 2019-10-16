import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section3LandingComponent } from './section3-landing.component';

describe('Section3LandingComponent', () => {
  let component: Section3LandingComponent;
  let fixture: ComponentFixture<Section3LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section3LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section3LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
