import { TestBed } from '@angular/core/testing';

import { AuthtwoService } from './authtwo.service';

describe('AuthtwoService', () => {
  let service: AuthtwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthtwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
