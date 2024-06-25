import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const ValidatePANChecksum: any;
declare const ProtectPANandCVV: any;
declare const PIE: any;

@Component({
  selector: 'lib-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  cardNo: string = '';
  cvv: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  nickname: string = '';
  autoPayEnabled: boolean = false;
  extendedPaymentPlan: boolean = false;
  embed: boolean = false;
  encryptedCard: string = '';
  encryptedCvv: string = '';
  integrityCheckVal: string = '';
  months: string[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];
  years: string[] = [
    '2024', '2025', '2026', '2027', '2028', '2029', '2030'
  ];

  constructor(private http: HttpClient) {}

  addCreditCard() {
    if (this.encryptCardDetails()) {
      const payload = {
        cardNo: this.encryptedCard,
        cvv: this.encryptedCvv,
        expiryMonth: this.expiryMonth,
        expiryYear: this.expiryYear,
        nickname: this.nickname,
        autoPayEnabled: this.autoPayEnabled,
        extendedPaymentPlan: this.extendedPaymentPlan,
        keyId: PIE.key_id,
        phase: PIE.phase
      };

      this.http.post('https://your-backend-endpoint.com/api/credit-cards', payload)
        .subscribe(response => {
          console.log('Card added successfully', response);
        }, error => {
          console.error('Error adding card', error);
        });
    }
  }

  encryptCardDetails() {
    if (this.isEncryptionScriptLoaded() && this.isKeyScriptLoaded()) {
      const ccno = this.cardNo;
      const cvv = this.cvv;
      const embed = this.embed;

      if (embed && !ValidatePANChecksum(ccno)) {
        alert("PAN has invalid checksum.");
        return false;
      }

      const result = ProtectPANandCVV(ccno, cvv, !embed);
      if (result != null) {
        this.encryptedCard = result[0];
        this.encryptedCvv = result[1];
        if (result.length > 2) {
          this.integrityCheckVal = result[2];
        }
        return true;
      } else {
        alert("Error: ProtectPANandCVV call returned null. You may have entered an invalid card number.");
        return false;
      }
    } else {
      alert("Encryption scripts not loaded properly.");
      return false;
    }
  }

  isEncryptionScriptLoaded() {
    return typeof ValidatePANChecksum === 'function' && typeof ProtectPANandCVV === 'function';
  }

  isKeyScriptLoaded() {
    return typeof PIE !== 'undefined' && typeof PIE.K !== 'undefined' && typeof PIE.L !== 'undefined' && typeof PIE.E !== 'undefined' && typeof PIE.key_id !== 'undefined' && typeof PIE.phase !== 'undefined';
  }
}
