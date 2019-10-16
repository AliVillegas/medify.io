import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section5LandingComponent } from './section5-landing.component';

describe('Section5LandingComponent', () => {
  let component: Section5LandingComponent;
  let fixture: ComponentFixture<Section5LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section5LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section5LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
