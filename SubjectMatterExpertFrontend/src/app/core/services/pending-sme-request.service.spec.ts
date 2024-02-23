import { TestBed } from '@angular/core/testing';

import { PendingSmeRequestService } from './pending-sme-request.service';

describe('PendingSmeRequestService', () => {
  let service: PendingSmeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingSmeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
