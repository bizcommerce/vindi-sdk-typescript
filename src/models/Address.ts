import { AddressInterface } from '../interfaces/AddressInterface';

export class Address implements AddressInterface {
  typeAddress: string;
  postalCode: string;
  street: string;
  number: string;
  completion: string;
  neighborhood: string;
  city: string;
  state: string;

  constructor(
    typeAddress: string,
    postalCode: string,
    street: string,
    number: string,
    completion: string,
    neighborhood: string,
    city: string,
    state: string,
  ) {
    this.typeAddress = typeAddress;
    this.postalCode = postalCode;
    this.street = street;
    this.number = number;
    this.completion = completion;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
  }
}
