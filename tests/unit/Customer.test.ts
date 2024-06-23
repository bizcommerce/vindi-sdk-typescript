import { Customer } from '../../src/models/Customer';
import { ContactInterface } from '../../src/interfaces/ContactInterface';
import { AddressInterface } from '../../src/interfaces/AddressInterface';

describe('Customer', () => {
  let customer: Customer;
  const mockContact: ContactInterface = {
    typeContact: 'M',
    numberContact: '11999999999',
  };
  const mockAddress: AddressInterface = {
    typeAddress: 'B',
    postalCode: '01001-010',
    street: 'Av Teste',
    number: '1001',
    completion: 'A',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
  };

  beforeEach(() => {
    customer = new Customer(
      'John Doe',
      'john.doe@example.com',
      '12345678900',
      '1990-01-01',
    );
  });

  it('should create a new customer', () => {
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toBe('John Doe');
    expect(customer.birthDate).toBe('1990-01-01');
    expect(customer.cpf).toBe('12345678900');
    expect(customer.email).toBe('john.doe@example.com');
  });

  it('should add a contact to the customer', () => {
    customer.addContact(mockContact);
    expect(customer.contacts).toContain(mockContact);
  });

  it('should add an address to the customer', () => {
    customer.addAddress(mockAddress);
    expect(customer.addresses).toContain(mockAddress);
  });
});
