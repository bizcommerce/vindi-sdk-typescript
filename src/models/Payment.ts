import { PaymentInterface } from '../interfaces/PaymentInterface';
import { CardInterface } from '../interfaces/CardInterface';
import { CreditCard } from '../utils/CreditCard';
import { PaymentMethod } from '../utils/PaymentMethod';

export class Payment implements PaymentInterface {
  paymentMethodId?: string;
  cardName?: string;
  cardNumber?: string;
  cardExpdateMonth?: string;
  cardExpdateYear?: string;
  cardCvv?: string;
  split?: string;

  setPaymentMethodId(paymentMethod: string) {
    this.paymentMethodId = PaymentMethod.getPaymentMethodId(paymentMethod);
  }

  getPaymentMethodId() {
    return this.paymentMethodId;
  }

  setCardDetails(cardDetails: CardInterface) {
    if (!CreditCard.isValid(cardDetails.cardNumber)) {
      throw new Error('Invalid credit card number.');
    }

    const paymentMethodId = CreditCard.getCardBrand(cardDetails.cardNumber);
    if (paymentMethodId === 'Unknown') {
      throw new Error(`Unknown card: BIN: ${cardDetails.cardNumber.substring(0,6)}, LAST4: ${cardDetails.cardNumber} .`);
    }
    
    this.setPaymentMethodId(paymentMethodId);

    this.cardName = cardDetails.cardName;
    this.cardNumber = cardDetails.cardNumber;
    this.cardExpdateMonth = cardDetails.cardExpdateMonth;
    this.cardExpdateYear = cardDetails.cardExpdateYear;
    this.cardCvv = cardDetails.cardCvv;
    this.split = cardDetails.split;
  }
}
