import { VindiClient } from '../../src/client/VindiClient';

import axios from 'axios';

// Mocking axios
jest.mock('axios');

describe('Checkout Client Integration Tests', () => {
  let vindiClient: VindiClient;

  beforeEach(() => {
    vindiClient = new VindiClient();
    vindiClient.initializeCart('SEU_TOKEN_AQUI');
  });

  it('should create checkout cart transaction', async () => {
    // Mock the axios.post response
    (axios.post as jest.Mock).mockResolvedValue({
      data: '<tmp_transaction>' +
              '<message_response>' +
                '<message>success</message>' +
              '</message_response>' +
              '<data_response>' +
                '<token_transaction>tc0b17786549d6c45f9d8f4f910777</token_transaction>' +
                '<url_car>https://tc-intermediador-sandbox.yapay.com.br/payment/car/v1/</url_car>' +
              '</data_response>' +
            '</tmp_transaction>'
    });

    vindiClient.addProduct(
      'Camiseta de Teste',
      '1',
      '119.00',
      'C01',
      'SK-0001',
      'Informação Extra',
      '0',
    );
    
    vindiClient.setCartDetails(
      '01001000', 
      '1000-01', 
      'https://minha.loja/notificacao',
      '10',
      '8',
    );

    vindiClient.getCartRequest().setUrlSuccess('https://minha.loja/success'); //Payment Confirmed
    vindiClient.getCartRequest().setUrlProcess('https://minha.loja/process'); //Waiting Payment
    vindiClient.getCartRequest().setUrlCancel('https://minha.loja/cancel'); //Canceled
    
    const response = await vindiClient.createCartTransaction();
    const expectedTransactionRequest = vindiClient.getCartRequest().toJson();

    // Assertions
    expect(response).toEqual({
      tmp_transaction: {
        message_response: { 
          message: 'success',
        },
        data_response: {
          token_transaction: 'tc0b17786549d6c45f9d8f4f910777',
          url_car: 'https://tc-intermediador-sandbox.yapay.com.br/payment/car/v1/'
        }
      }
    });
    expect(axios.post).toHaveBeenCalledWith(
      'https://api.intermediador.yapay.com.br/v1/tmp_transactions/create',
      expectedTransactionRequest,
      { headers: { 'Content-Type': 'application/json' } },
    );
  });
});
