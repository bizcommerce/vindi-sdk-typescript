import { CustomerInterface } from './CustomerInterface';
import { ProductInterface } from './ProductInterface';
import {
  TransactionDetailsInterface,
  TransactionTraceInterface,
} from './TransactionDetailsInterface';
import { PaymentInterface } from './PaymentInterface';

export interface TransactionRequestInterface {
  tokenAccount: string;
  customer: CustomerInterface;
  transactionProduct: ProductInterface[];
  transaction: TransactionDetailsInterface;
  transactionTrace: TransactionTraceInterface;
  payment: PaymentInterface;
}
