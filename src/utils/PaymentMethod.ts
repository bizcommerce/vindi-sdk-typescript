export class PaymentMethod {
  private static paymentMethodMap: Map<string, string> = new Map<
    string,
    string
  >([
    ['Visa', '3'],
    ['Mastercard', '4'],
    ['American Express', '5'],
    ['Elo', '16'],
    ['Hipercard', '20'],
    ['Hiper', '25'],
    ['Boleto Bancário', '6'],
    ['Boleto', '6'],
    ['Transf. Online Itaú', '7'],
    ['Transf. Online Banco do Brasil', '23'],
    ['Pagamento com Saldo', '8'],
    ['Pix', '27'],
    ['Bolepix', '28'],
  ]);

  static getPaymentMethodId(methodName: string): string {
    const methodId = this.paymentMethodMap.get(methodName);
    if (methodId === undefined) {
      throw new Error(`Payment method ${methodName} not found.`);
    }
    return methodId;
  }
}
