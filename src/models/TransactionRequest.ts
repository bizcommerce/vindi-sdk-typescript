import { CustomerInterface } from '../interfaces/CustomerInterface';
import { ProductInterface } from '../interfaces/ProductInterface';
import { StringConvertor } from '../utils/StringConvertor';
import {
  TransactionDetailsInterface,
  TransactionTraceInterface,
} from '../interfaces/TransactionDetailsInterface';
import { PaymentInterface } from '../interfaces/PaymentInterface';

export class TransactionRequest {
  tokenAccount: string;
  customer!: CustomerInterface;
  transactionProduct: ProductInterface[] = [];
  transaction!: TransactionDetailsInterface;
  transactionTrace!: TransactionTraceInterface;
  payment!: PaymentInterface;
  paymentMethodId!: string;

  constructor(tokenAccount: string) {
    this.tokenAccount = tokenAccount;
  }

  getTokenAccount(): string {
    return this.tokenAccount;
  }

  setCustomer(customer: CustomerInterface): void {
    this.customer = customer;
  }

  addProduct(product: ProductInterface): void {
    this.transactionProduct.push(product);
  }

  setTransactionDetails(transactionDetails: TransactionDetailsInterface): void {
    this.transaction = transactionDetails;
  }

  setTransactionTrace(transactionTrace: TransactionTraceInterface): void {
    this.transactionTrace = transactionTrace;
  }

  setPaymentMethodId(paymentMethodId: string): void {
    this.paymentMethodId = paymentMethodId;
  }

  setPayment(payment: PaymentInterface): void {
    payment.paymentMethodId = payment.paymentMethodId || this.paymentMethodId;
    this.payment = payment;
  }

  toJson(): any {
    return StringConvertor.convertCamelCaseToSnakeCaseRecursive({
      tokenAccount: this.tokenAccount,
      customer: this.customer,
      transactionProduct: this.transactionProduct,
      transaction: this.transaction,
      transactionTrace: this.transactionTrace,
      payment: this.payment,
    });
  }
}
