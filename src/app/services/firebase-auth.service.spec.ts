import { TestBed } from '@angular/core/testing';

import { UserService } from './firebase-auth.service';

describe('FirebaseAuthService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
