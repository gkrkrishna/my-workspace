import { TestBed } from '@angular/core/testing';

import { CreditCardEncryptionService } from './credit-card-encryption.service';

describe('CreditCardEncryptionService', () => {
  let service: CreditCardEncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardEncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
