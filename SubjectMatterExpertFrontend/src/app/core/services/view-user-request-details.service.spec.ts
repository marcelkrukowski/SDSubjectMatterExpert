import { TestBed } from '@angular/core/testing';

import { ViewUserRequestDetailsService } from './view-user-request-details.service';

describe('ViewUserRequestDetailsService', () => {
  let service: ViewUserRequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewUserRequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
