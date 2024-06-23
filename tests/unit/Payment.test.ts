import { Payment } from '../../src/models/Payment';

describe('Payment', () => {
  let payment: Payment;

  beforeEach(() => {
    payment = new Payment();
  });

  it('should set credit card details', () => {
    payment.setCardDetails({
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      cardExpdateMonth: '12',
      cardExpdateYear: '2025',
      cardCvv: '123',
      split: '1',
    });
    expect(payment.cardName).toBe('John Doe');
    expect(payment.cardNumber).toBe('4111111111111111');
    expect(payment.cardExpdateMonth).toBe('12');
    expect(payment.cardExpdateYear).toBe('2025');
    expect(payment.cardCvv).toBe('123');
    expect(payment.split).toBe('1');
  });

  it('should handle Pix payment type', () => {
    payment.setPaymentMethodId('Pix');
    expect(payment.paymentMethodId).toBe('27');
  });

  it('should handle Bankslip payment type', () => {
    payment.setPaymentMethodId('Boleto Bancário');
    expect(payment.paymentMethodId).toBe('6');
  });

  it('should handle BankslipPix payment type', () => {
    payment.setPaymentMethodId('Bolepix');
    expect(payment.paymentMethodId).toBe('28');
  });
});
