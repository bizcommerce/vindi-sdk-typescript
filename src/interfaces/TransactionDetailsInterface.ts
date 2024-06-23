export interface TransactionDetailsInterface {
  customerIp: string;
  shippingType: string;
  shippingPrice: string;
  urlNotification: string;
  priceDiscount?: string;
  free?: string;
}

export interface TransactionTraceInterface {
  estimatedDate: string;
}
