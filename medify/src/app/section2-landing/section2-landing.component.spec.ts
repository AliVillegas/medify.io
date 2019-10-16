import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2LandingComponent } from './section2-landing.component';

describe('Section2LandingComponent', () => {
  let component: Section2LandingComponent;
  let fixture: ComponentFixture<Section2LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section2LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section2LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
