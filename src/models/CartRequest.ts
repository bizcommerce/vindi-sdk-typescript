import { ProductInterface } from '../interfaces/ProductInterface';

export class CartRequest {
  tokenAccount: string;
  postalCodeSeller?: string;
  urlNotification?: string;
  orderNumber?: string;
  priceAdditional?: string;
  priceDiscount?: string;
  transactionProduct: ProductInterface[] = [];

  constructor(
    tokenAccount: string,
  ) {
    this.tokenAccount = tokenAccount;
  }

  getTokenAccount(): string {
    return this.tokenAccount;
  }

  setCartDetails(
    postalCodeSeller: string,
    urlNotification: string,
    orderNumber: string,
    priceAdditional: string,
    priceDiscount: string,
  ): void {
    this.postalCodeSeller = postalCodeSeller;
    this.urlNotification = urlNotification;
    this.orderNumber = orderNumber;
    this.priceAdditional = priceAdditional;
    this.priceDiscount = priceDiscount;
  }

  addProduct(product: ProductInterface): void {
    this.transactionProduct.push(product);
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
      postalCodeSeller: this.postalCodeSeller,
      urlNotification: this.urlNotification,
      orderNumber: this.orderNumber,
      priceAdditional: this.priceAdditional,
      priceDiscount: this.priceDiscount,
      transactionProduct: this.transactionProduct,
    });
  }
}
