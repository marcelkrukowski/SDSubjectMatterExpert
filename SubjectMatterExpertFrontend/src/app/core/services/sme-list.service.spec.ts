import { TestBed } from '@angular/core/testing';

import { SmeListService } from './sme-list.service';

describe('SmeListService', () => {
  let service: SmeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
