import { TestBed } from '@angular/core/testing';

import { SidebarDataService } from './sidebar-data.service';

describe('SidebarDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidebarDataService = TestBed.get(SidebarDataService);
    expect(service).toBeTruthy();
  });
});
