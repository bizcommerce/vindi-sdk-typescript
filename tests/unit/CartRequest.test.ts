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
    urlNotification = 'https://seja.loja.biz/notificacao';
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


  it('should convert camel case to snake case single object', () => {
    const obj = { camelCase: 'value' };
    const expected = { camel_case: 'value' };
    expect(
      cartRequest.convertCamelCaseToSnakeCaseRecursive(obj),
    ).toEqual(expected);
  });

  it('should convert camel case to snake case recursively', () => {
    const obj = {
      tokenAccount: 'tokenAccount',
      transactionProduct: {
        name: 'Camiseta Tony Stark',
        code: '1',
        price: '130.00',
        quantity: '1',
        category: '0001',
        extraInfo: 'Informação Extra',
      },
    };

    const expected = {
      token_account: 'tokenAccount',
      transaction_product: {
        name: 'Camiseta Tony Stark',
        code: '1',
        price: '130.00',
        quantity: '1',
        category: '0001',
        extra_info: 'Informação Extra',
      },
    };
    expect(
      cartRequest.convertCamelCaseToSnakeCaseRecursive(obj),
    ).toEqual(expected);
  });

});