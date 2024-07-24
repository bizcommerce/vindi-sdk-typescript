import { VindiClient } from '../../src/client/VindiClient';

import axios from 'axios';

// Mocking axios
jest.mock('axios');

describe('VindiClient Integration Tests', () => {
  let vindiClient: VindiClient;

  beforeEach(() => {
    vindiClient = new VindiClient();
    vindiClient.initialize('SEU_TOKEN_AQUI');
  });

  it('should create a credit card transaction', async () => {
    // Mock the axios.post response
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id: 'transaction-id', status: 'success' },
    });

    // Set up customer
    vindiClient.addCustomer(
      'Stephen Strange',
      'stephen.strange@avengers.com',
      '50235335142',
      '21/05/1941',
    );

    //Add Contacts
    vindiClient.addContact('H', '1133221122');
    vindiClient.addContact('M', '11999999999');

    // Add Addresses
    vindiClient.addBillingAddress(
      '17000-000',
      'Av Esmeralda',
      '1001',
      'A',
      'Jd Esmeralda',
      'Marilia',
      'SP',
    );

    // Add product
    vindiClient.addProduct(
      'Camiseta Tony Stark',
      '1',
      '130.00',
      '1',
      '0001',
      'Informação Extra',
    );

    // Set transaction details
    vindiClient.addTransactionDetails(
      '127.0.0.1',
      'Sedex',
      '12',
      'http://www.loja.com.br/notificacao',
      'FREE',
      '0',
      '1000-10'
    );

    // Set transaction trace
    vindiClient.addEstimatedDate('02/04/2022');

    // Create transaction
    const response = await vindiClient.createCreditCardTransaction(
      'STEPHEN STRANGE',
      '4111111111111111',
      '01',
      '2021',
      '644',
      '1',
    );
    const expectedTransactionRequest = vindiClient.getTransactionRequest().toJson();

    // Assertions
    expect(response).toEqual({ id: 'transaction-id', status: 'success' });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.intermediador.yapay.com.br/api/v3/transactions/payment',
      expectedTransactionRequest,
      { headers: { 'Content-Type': 'application/json' } },
    );
  });
});
