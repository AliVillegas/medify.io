import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLandingComponent } from './carousel-landing.component';

describe('CarouselLandingComponent', () => {
  let component: CarouselLandingComponent;
  let fixture: ComponentFixture<CarouselLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
