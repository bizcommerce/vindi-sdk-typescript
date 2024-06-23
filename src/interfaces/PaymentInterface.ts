export interface PaymentInterface {
  paymentMethodId?: string;
  cardName?: string;
  cardNumber?: string;
  cardExpdateMonth?: string;
  cardExpdateYear?: string;
  cardCvv?: string;
  split?: string;
}
