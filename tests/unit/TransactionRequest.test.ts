import { TransactionRequest } from '../../src/models/TransactionRequest';
import { Customer } from '../../src/models/Customer';
import { Product } from '../../src/models/Product';
import { TransactionDetails } from '../../src/models/TransactionDetails';
import { TransactionTrace } from '../../src/models/TransactionTrace';
import { Payment } from '../../src/models/Payment';

describe('TransactionRequest', () => {
  let transactionRequest: TransactionRequest;
  let customer: Customer;
  let product: Product;
  let transactionDetails: TransactionDetails;
  let transactionTrace: TransactionTrace;
  let payment: Payment;

  beforeEach(() => {
    transactionRequest = new TransactionRequest('tokenAccount');
    customer = new Customer('John Doe', 'john.doe@example.com', '00000000191');
    product = new Product(
      'Camiseta Tony Stark',
      '1',
      '130.00',
      '1',
      '0001',
      'Informação Extra',
    );
    transactionDetails = new TransactionDetails(
      '127.0.0.1',
      'Sedex',
      '12',
      'http://www.loja.com.br/notificacao',
    );
    transactionTrace = new TransactionTrace('02/04/2022');
    payment = new Payment();
    payment.setPaymentMethodId('Pix');
  });

  it('should set customer', () => {
    transactionRequest.setCustomer(customer);
    expect(transactionRequest.customer).toBe(customer);
  });

  it('should add product', () => {
    transactionRequest.addProduct(product);
    expect(transactionRequest.transactionProduct).toContain(product);
  });

  it('should set transaction details', () => {
    transactionRequest.setTransactionDetails(transactionDetails);
    expect(transactionRequest.transaction).toBe(transactionDetails);
  });

  it('should set transaction trace', () => {
    transactionRequest.setTransactionTrace(transactionTrace);
    expect(transactionRequest.transactionTrace).toBe(transactionTrace);
  });

  it('should set payment', () => {
    transactionRequest.setPayment(payment);
    expect(transactionRequest.payment).toBe(payment);
  });
});
