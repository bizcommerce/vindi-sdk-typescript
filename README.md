# Vindi TypeScript Library

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/bizcommerce/vindi-sdk-typescript/actions/workflows/test.yml/badge.svg)](https://github.com/bizcommerce/vindi-sdk-typescript/actions)
![Beta](https://img.shields.io/badge/status-beta-yellow)




A TypeScript library for interacting with the Vindi API to create transactions using various payment methods such as Pix, CreditCard, and BankSlip.
This project is currently in beta. Feel free to contribute and report any issues you encounter.

## Installation

```bash
npm install vindi-payments
```

### Usage

```typescript
import { VindiClient } from 'vindi-payments';
```

### Initializing the Client

```typescript
const isSandbox = true;
const vindiClient = new VindiClient(isSandbox);

// Initialize the transaction request
vindiClient.initialize('SEU_TOKEN_AQUI');

```

### Fingerpint  
To Generate the Fingerprint, it's necessary to have the DOM loaded (in beta)  

```typescript
// Generate fingerprint
vindiClient.generateFingerprint(document);
```

### Setting Up the Customer

```typescript
//Name, email, cpf, date of birthday (DD/MM/YYYY)
vindiClient.addCustomer('João das Neves', 'joazinho.stark@winterfel.com', '50235335142', '01/01/1990');

//H = Home (Landline), M = Mobile
vindiClient.addContact('H', '1133221122');
vindiClient.addContact('M', '11999999999');

//Postcode, Street, Number, Complement, Neighborhood, City, Region
vindiClient.addBillingAddress('17000-000', 'Av Esmeralda', '1001', 'Apartamento 3', 'Jd Esmeralda', 'Marilia', 'SP');
vindiClient.addShippingAddress('01001-010', 'Avenida do Centro', '99', 'Sala 602', 'Centro', 'São Paulo', 'SP');

```


### Adding Products

```typescript
vindiClient.addProduct(
  'Camiseta de Teste', //Description
  '1', // Quantity
  '119.00', // Price Unit
  'C01', // Code
  'SK-0001', // SKU
  'Informação Extra' //Extra
);

``` 

### Setting transaction Details

```typescript
vindiClient.addTransactionDetails(
  '127.0.0.1', //IP
  'Sedex', //Shipping Description
  '12', //ShippingPrice
  'http://www.loja.com.br/notificacao', //Notification URL
  'MY-ORDER-ID' // Free
);

//Estimated Delivery Date
vindiClient.addEstimatedDate('02/04/2025');

```


## Payment Examples

### Pix
```typescript
async function createPixTransaction() {
  try {
    const response = await vindiClient.createPixTransaction();
    console.log('Pix Transaction:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

createPixTransaction();
```

### Credit Card

```typescript
async function createCreditCardTransaction() {
  try {
    const response = await vindiClient.createCreditCardTransaction(
      'JOAO DAS NEVES',
      '4111111111111111',
      '01',
      '2030',
      '644',
      '1'
    );
    console.log('Credit Card Transaction:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

createCreditCardTransaction();
```

### BankSlip

```typescript
const paymentBankSlip = new Payment();
vindiClient.setPayment(paymentBankSlip);

async function createBankSlipTransaction() {
  try {
    const response = await vindiClient.createBankSlipTransaction();
    console.log('Bank Slip Transaction:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

createBankSlipTransaction();

```

### BankSlipPix

```typescript
const paymentBankSlipPix = new Payment();
vindiClient.setPayment(paymentBankSlipPix);

async function createBankSlipPixTransaction() {
  try {
    const response = await vindiClient.createBankSlipPixTransaction();
    console.log('Bank Slip ìx Transaction:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

createBankSlipPixTransaction();

```


## Tracking Code

```typescript
async function addTrackingCode(transactionId: string, trackingCode: string) {
  try {
    const response = await vindiClient.addTrackingCode(transactionId, trackingCode);
    console.log('Tracking Code Added:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

addTrackingCode('transaction-id', 'tracking-code');
```

## Querying a transaction

```typescript
async function queryTransaction(transactionId: string) {
  try {
    const response = await vindiClient.queryTransaction(transactionId);
    console.log('Transaction Details:', response);
  } catch (error) {
    vindiClient.handleError(error);
  }
}

queryTransaction('transaction-id');
```

## Error Handling

```typescript
public handleError(error: any): void {
  console.error('Error:', error.message);
  if (error.response) {
    console.error('Response data:', error.response.data);
  }
}
``` 