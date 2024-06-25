import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardEncryptionComponent } from './credit-card-encryption.component';

describe('CreditCardEncryptionComponent', () => {
  let component: CreditCardEncryptionComponent;
  let fixture: ComponentFixture<CreditCardEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardEncryptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
