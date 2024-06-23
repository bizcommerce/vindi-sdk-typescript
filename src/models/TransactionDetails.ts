import { TransactionDetailsInterface } from '../interfaces/TransactionDetailsInterface';

export class TransactionDetails implements TransactionDetailsInterface {
  customerIp: string;
  shippingType: string;
  shippingPrice: string;
  urlNotification: string;
  free?: string;
  priceDiscount?: string;

  constructor(
    customerIp: string,
    shippingType: string,
    shippingPrice: string,
    urlNotification: string,
    free?: string,
    priceDiscount?: string,
  ) {
    this.customerIp = customerIp;
    this.shippingType = shippingType;
    this.shippingPrice = shippingPrice;
    this.urlNotification = urlNotification;
    this.free = free;
    this.priceDiscount = priceDiscount;
  }
}
