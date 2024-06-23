import { TransactionTraceInterface } from '../interfaces/TransactionDetailsInterface';

export class TransactionTrace {
  estimatedDate: string;

  constructor(estimatedDate: string) {
    this.estimatedDate = estimatedDate;
  }
}
