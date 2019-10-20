import { TestBed } from '@angular/core/testing';

import { NavbarDataService } from './navbar-data.service';

describe('NavbarDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarDataService = TestBed.get(NavbarDataService);
    expect(service).toBeTruthy();
  });
});
