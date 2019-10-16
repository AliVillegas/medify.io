import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section1LandingComponent } from './section1-landing.component';

describe('Section1LandingComponent', () => {
  let component: Section1LandingComponent;
  let fixture: ComponentFixture<Section1LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section1LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section1LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
