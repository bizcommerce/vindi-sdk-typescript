import { ContactInterface } from './ContactInterface';
import { AddressInterface } from './AddressInterface';

export interface CustomerInterface {
  contacts: ContactInterface[];
  addresses: AddressInterface[];
  name: string;
  birthDate: string;
  cpf: string;
  email: string;

  addContact(contact: ContactInterface): void;

  addAddress(address: AddressInterface): void;
}
