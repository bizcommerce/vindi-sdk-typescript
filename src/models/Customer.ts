import { CustomerInterface } from '../interfaces/CustomerInterface';
import { ContactInterface } from '../interfaces/ContactInterface';
import { AddressInterface } from '../interfaces/AddressInterface';

export class Customer implements CustomerInterface {
  contacts: ContactInterface[] = [];
  addresses: AddressInterface[] = [];
  name: string;
  email: string;
  cpf: string;
  birthDate: string;

  constructor(
    name: string,
    email: string,
    cpf: string,
    birthDate: string = '',
  ) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.birthDate = birthDate;
  }

  addContact(contact: ContactInterface) {
    this.contacts.push(contact);
  }

  addAddress(address: AddressInterface) {
    this.addresses.push(address);
  }
}
