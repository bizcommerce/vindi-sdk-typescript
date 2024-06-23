type CardBrand =
  | 'Visa'
  | 'MasterCard'
  | 'American Express'
  | 'Elo'
  | 'Hipercard'
  | 'Hiper'
  | 'Unknown';

export class CreditCard {
  private static visaRegex = /^4[0-9]{5}/;
  private static masterCardRegex = /^5[1-5][0-9]{4}/;
  private static amexRegex = /^3[47][0-9]{4}/;
  private static eloRegex = /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/;
  private static hipercardRegex =
    /^(3841[046]0|60|606282|637095|637568)\d{10,17}/;
  private static hiperRegex = /^637095|637568|637599|637609|637612\d{10}/;

  public static getCardBrand(cardNumber: string): CardBrand {
    const bin = cardNumber.substring(0, 6);

    if (this.visaRegex.test(bin)) {
      return 'Visa';
    }

    if (this.masterCardRegex.test(bin)) {
      return 'MasterCard';
    }

    if (this.amexRegex.test(bin)) {
      return 'American Express';
    }

    if (this.eloRegex.test(bin)) {
      return 'Elo';
    }

    if (this.hipercardRegex.test(bin)) {
      return 'Hipercard';
    }

    if (this.hiperRegex.test(bin)) {
      return 'Hiper';
    }

    return 'Unknown';
  }

  public static isValid(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    // Loop through the card number from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  public static maskCardNumber(cardNumber: string): string {
    return (
      cardNumber.slice(0, 4) +
      cardNumber.slice(4, -4).replace(/./g, '*') +
      cardNumber.slice(-4)
    );
  }
}