import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section4LandingComponent } from './section4-landing.component';

describe('Section4LandingComponent', () => {
  let component: Section4LandingComponent;
  let fixture: ComponentFixture<Section4LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section4LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section4LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
