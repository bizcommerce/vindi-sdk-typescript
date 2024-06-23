import { ContactInterface } from '../interfaces/ContactInterface';

export class Contact implements ContactInterface {
  typeContact: string;
  numberContact: string;

  constructor(typeContact: string, numberContact: string) {
    this.typeContact = typeContact;
    this.numberContact = numberContact;
  }
}
