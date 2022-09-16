import { TestBed } from '@angular/core/testing';

import { CLientService } from './client.service';

describe('CLientService', () => {
  let service: CLientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CLientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
