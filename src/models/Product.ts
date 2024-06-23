import { ProductInterface } from '../interfaces/ProductInterface';

export class Product implements ProductInterface {
  description: string;
  quantity: string;
  priceUnit: string;
  code: string;
  skuCode: string;
  extra: string;

  constructor(
    description: string,
    quantity: string,
    priceUnit: string,
    code: string,
    skuCode: string,
    extra: string = '',
  ) {
    this.description = description;
    this.quantity = quantity;
    this.priceUnit = priceUnit;
    this.code = code;
    this.skuCode = skuCode;
    this.extra = extra;
  }
}
