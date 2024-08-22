import { CartRequest } from '../../src/models/CartRequest';
import { Product } from '../../src/models/Product';

describe('CheckoutRequest', () => {
  let cartRequest: CartRequest;
  let product: Product;
  let postalCodeSeller: string;
  let orderNumber: string;
  let urlNotification: string;
  let priceAdditional: string;
  let priceDiscount: string;

  beforeEach(() => {
    cartRequest = new CartRequest('TOKEN');
    postalCodeSeller = '01001000';
    orderNumber = '1000-01';
    urlNotification = 'https://minha.loja/notificacao';
    priceAdditional = '10';
    priceDiscount = '8';
    product = new Product(
      'Camiseta Tony Stark',
      '1',
      '130.00',
      '1',
      '0001',
      'Informação Extra',
      '0'
    );
  });

  it('should get token account', () => {
    expect(cartRequest.getTokenAccount()).toBe('TOKEN');
  });

  it('should add product', () => {
    cartRequest.addProduct(product);
    expect(cartRequest.transactionProduct).toContain(product);
  });

  it('should set cart details', () => {
    cartRequest.setCartDetails(
      postalCodeSeller, 
      urlNotification,
      orderNumber,
      priceAdditional,
      priceDiscount,
    );
    expect(cartRequest.postalCodeSeller).toBe(postalCodeSeller);
    expect(cartRequest.urlNotification).toBe(urlNotification);
    expect(cartRequest.orderNumber).toBe(orderNumber);
    expect(cartRequest.priceAdditional).toBe(priceAdditional);
    expect(cartRequest.priceDiscount).toBe(priceDiscount);
  });

  it('should set url success', () => {
    const urlSuccess = 'https://minha.loja/success';
    cartRequest.setUrlSuccess(urlSuccess);
    expect(cartRequest.urlSuccess).toBe(urlSuccess);
  });

  it('should set url process', () => {
    const urlProcess = 'https://minha.loja/processing';
    cartRequest.setUrlProcess(urlProcess);
    expect(cartRequest.urlProcess).toBe(urlProcess);
  });

  it('should set url cancel', () => {
    const urlCancel = 'https://minha.loja/cancel';
    cartRequest.setUrlCancel(urlCancel);
    expect(cartRequest.urlCancel).toBe(urlCancel);
  });

  it('should set postal code customer', () => {
    const postalCodeCustomer = '01001000';
    cartRequest.setPostalCodeCustomer(postalCodeCustomer);
    expect(cartRequest.postalCodeCustomer).toBe(postalCodeCustomer);
  });

  it('should set max split transaction', () => {
    const maxSplitTransaction = '10';
    cartRequest.setMaxSplitTransaction(maxSplitTransaction);
    expect(cartRequest.maxSplitTransaction).toBe(maxSplitTransaction);
  });

  it('should set shipping type', () => {
    const shippingType = 'Sedex';
    cartRequest.setShippingType(shippingType);
    expect(cartRequest.shippingType).toBe(shippingType);
  });

  it('should set shipping price', () => {
    const shippingPrice = '10';
    cartRequest.setShippingPrice(shippingPrice);
    expect(cartRequest.shippingPrice).toBe(shippingPrice);
  });

});