import { TestBed } from '@angular/core/testing';

import { ConstributorsService } from './constributors.service';

describe('ConstributorsService', () => {
  let service: ConstributorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstributorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
