import { PaymentMethod } from '../../src/utils/PaymentMethod';

describe('PaymentMethod', () => {
  test('should return correct ID for valid payment method name', () => {
    expect(PaymentMethod.getPaymentMethodId('Visa')).toBe('3');
    expect(PaymentMethod.getPaymentMethodId('Mastercard')).toBe('4');
    expect(PaymentMethod.getPaymentMethodId('American Express')).toBe('5');
    expect(PaymentMethod.getPaymentMethodId('Elo')).toBe('16');
    expect(PaymentMethod.getPaymentMethodId('Hipercard')).toBe('20');
    expect(PaymentMethod.getPaymentMethodId('Hiper')).toBe('25');
    expect(PaymentMethod.getPaymentMethodId('Boleto Bancário')).toBe('6');
    expect(PaymentMethod.getPaymentMethodId('Transf. Online Itaú')).toBe('7');
    expect(
      PaymentMethod.getPaymentMethodId('Transf. Online Banco do Brasil'),
    ).toBe('23');
    expect(PaymentMethod.getPaymentMethodId('Pagamento com Saldo')).toBe('8');
    expect(PaymentMethod.getPaymentMethodId('Pix')).toBe('27');
    expect(PaymentMethod.getPaymentMethodId('Bolepix')).toBe('28');
  });

  test('should throw error when payment method name is not found', () => {
    expect(() =>
      PaymentMethod.getPaymentMethodId('Invalid Payment Method'),
    ).toThrow(new Error('Payment method Invalid Payment Method not found.'));
  });
});
