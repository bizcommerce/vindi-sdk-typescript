import { CustomerInterface } from '../interfaces/CustomerInterface';
import { ProductInterface } from '../interfaces/ProductInterface';
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

  convertCamelCaseToSnakeCaseRecursive(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertCamelCaseToSnakeCaseRecursive(item));
    }

    if (obj !== null && typeof obj === 'object') {
      const snakeCaseObj: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (obj[key] !== undefined) {
            const value = obj[key];
            const snakeCaseKey = key.replace(
              /[A-Z]/g,
              (letter) => `_${letter.toLowerCase()}`,
            );
            snakeCaseObj[snakeCaseKey] = this.convertCamelCaseToSnakeCaseRecursive(value);
          }
        }
      }
      return snakeCaseObj;
    }

    return obj;
  }

  toJson(): any {
    return this.convertCamelCaseToSnakeCaseRecursive({
      tokenAccount: this.tokenAccount,
      customer: this.customer,
      transactionProduct: this.transactionProduct,
      transaction: this.transaction,
      transactionTrace: this.transactionTrace,
      payment: this.payment,
    });
  }
}
