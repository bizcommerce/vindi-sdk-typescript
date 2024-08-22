import { ProductInterface } from '../interfaces/ProductInterface';
import { StringConvertor } from '../utils/StringConvertor';

export class CartRequest {
  tokenAccount: string;
  postalCodeSeller?: string;
  urlNotification?: string;
  orderNumber?: string;
  priceAdditional?: string;
  priceDiscount?: string;
  urlSuccess?: string;
  urlProcess?: string;
  urlCancel?: string;
  postalCodeCustomer?: string;
  maxSplitTransaction?: string;
  shippingType?: string;
  shippingPrice?: string;
  
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

  setUrlSuccess(urlSuccess: string): void {
    this.urlSuccess = urlSuccess;
  }

  setUrlProcess(urlProcess: string): void {
    this.urlProcess = urlProcess;
  }

  setUrlCancel(urlCancel: string): void {
    this.urlCancel = urlCancel;
  }

  setPostalCodeCustomer(postalCodeCustomer: string): void {
    this.postalCodeCustomer = postalCodeCustomer;
  }

  setMaxSplitTransaction(maxSplitTransaction: string): void {
    this.maxSplitTransaction = maxSplitTransaction;
  }

  setShippingType(shippingType: string): void {
    this.shippingType = shippingType;
  }

  setShippingPrice(shippingPrice: string): void {
    this.shippingPrice = shippingPrice;
  }



  addProduct(product: ProductInterface): void {
    this.transactionProduct.push(product);
  }

  toJson(): any {
    return StringConvertor.convertCamelCaseToSnakeCaseRecursive({
      tokenAccount: this.tokenAccount,
      postalCodeSeller: this.postalCodeSeller,
      urlNotification: this.urlNotification,
      urlSuccess: this.urlSuccess,
      urlProcess: this.urlProcess,
      urlCancel: this.urlCancel,
      orderNumber: this.orderNumber,
      priceAdditional: this.priceAdditional,
      priceDiscount: this.priceDiscount,
      transactionProduct: this.transactionProduct,
      postalCodeCustomer: this.postalCodeCustomer,
      maxSplitTransaction: this.maxSplitTransaction,
      shippingType: this.shippingType,
      shippingPrice: this.shippingPrice,
    });
  }
}
