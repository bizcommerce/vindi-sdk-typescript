import { StringConvertor } from '../../src/utils/StringConvertor';

describe('StringConvertor', () => {
  it('should convert camel case to snake case single object', () => {
    const obj = { camelCase: 'value' };
    const expected = { camel_case: 'value' };
    expect(StringConvertor.convertCamelCaseToSnakeCaseRecursive(obj)).toEqual(
      expected,
    );
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
        extraData: {
          shippingMethod: 'Sedex',
        },
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
        extra_data: {
          shipping_method: 'Sedex',
        },
      },
    };
    expect(StringConvertor.convertCamelCaseToSnakeCaseRecursive(obj)).toEqual(
      expected,
    );
  });
});
