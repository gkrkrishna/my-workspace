import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  declarations: [CreditCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [CreditCardComponent]
})
export class CreditCardEncryptionModule { }
