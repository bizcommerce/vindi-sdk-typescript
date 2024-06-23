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

  it('should convert camel case to snake case single object', () => {
    const obj = { camelCase: 'value' };
    const expected = { camel_case: 'value' };
    expect(
      transactionRequest.convertCamelCaseToSnakeCaseRecursive(obj),
    ).toEqual(expected);
  });

  it('should convert camel case to snake case recursively', () => {
    const obj = {
      tokenAccount: 'tokenAccount',
      customer: {
        name: 'João Das Neves',
        email: 'email@email.com',
        cpf: '00000000191',
      },
      transactionProduct: {
        name: 'Camiseta Tony Stark',
        code: '1',
        price: '130.00',
        quantity: '1',
        category: '0001',
        extraInfo: 'Informação Extra',
      },
      transaction: {
        ip: '127.0.0.1',
        shippingMethod: 'Sedex',
        shippingPrice: '12',
        notificationUrl: 'http://www.loja.com.br/notificacao',
      },
      transactionTrace: {
        expectedDeliveryDate: '02/04/2022',
      },
      payment: {
        paymentMethodId: 'Pix',
      },
    };
    const expected = {
      token_account: 'tokenAccount',
      customer: {
        name: 'João Das Neves',
        email: 'email@email.com',
        cpf: '00000000191',
      },
      transaction_product: {
        name: 'Camiseta Tony Stark',
        code: '1',
        price: '130.00',
        quantity: '1',
        category: '0001',
        extra_info: 'Informação Extra',
      },
      transaction: {
        ip: '127.0.0.1',
        shipping_method: 'Sedex',
        shipping_price: '12',
        notification_url: 'http://www.loja.com.br/notificacao',
      },
      transaction_trace: {
        expected_delivery_date: '02/04/2022',
      },
      payment: {
        payment_method_id: 'Pix',
      },
    };
    expect(
      transactionRequest.convertCamelCaseToSnakeCaseRecursive(obj),
    ).toEqual(expected);
  });
});
