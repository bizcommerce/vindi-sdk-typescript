import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { Fingerprint } from '../utils/Fingerprint';
import { Customer } from '../models/Customer';
import { Contact } from '../models/Contact';
import { Address } from '../models/Address';
import { Product } from '../models/Product';
import { TransactionDetails } from '../models/TransactionDetails';
import { TransactionTrace } from '../models/TransactionTrace';
import { Payment } from '../models/Payment';
import { CartRequest } from '../models/CartRequest';
import { TransactionRequest } from '../models/TransactionRequest';
import { ApiResponseInterface } from '../interfaces/response/ApiResponseInterface';
import { CardInterface } from 'interfaces/CardInterface';

export class VindiClient {
  private baseURL: string = 'https://api.intermediador.yapay.com.br';
  private sandboxBaseURL: string = 'https://api.intermediador.sandbox.yapay.com.br';
  private fingerprint?: Fingerprint;
  private transactionRequest?: TransactionRequest;
  private cartRequest?: CartRequest;
  private lastRequest: any = null;
  private lastResponse: any = null;

  constructor(isSandbox?: boolean) {
    if (isSandbox) {
      this.baseURL = this.sandboxBaseURL;
    }

    axios.interceptors.request.use(
      (request) => {
        this.lastRequest = request;
        return request;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      response => {
        this.lastResponse = response;
        return response;
      },
      error => {
        if (error.response) {
          this.lastResponse = error.response;
        }
        return Promise.reject(error);
      },
    );
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
    };
  }

  public getLastRequest() {
    return this.lastRequest || null;
  }

  public getLastResponse() {
    return this.lastResponse || null;
  }

  public generateFingerprint(doc: Document): void {
    this.fingerprint = new Fingerprint();
    this.fingerprint.generateFingerprint(doc);
  }

  public initialize(tokenAccount: string): void {
    this.transactionRequest = new TransactionRequest(tokenAccount);
  }

  public initializeCart(tokenAccount: string): void {
    this.cartRequest = new CartRequest(tokenAccount);
  }

  public setCartDetails(
    postalCodeSeller: string,
    orderNumber: string,
    urlNotification: string,
    priceAdditional: string = '0',
    priceDiscount: string = '0',
  ): void {
    if (!this.cartRequest) {
      throw new Error('Client not initialized.');
    }

    this.cartRequest.setCartDetails(
      postalCodeSeller,
      urlNotification,
      orderNumber,
      priceAdditional,
      priceDiscount,
    );
  }

  public addCustomer(
    name: string,
    email: string,
    cpf: string,
    birthDate: string = '',
  ): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }
    this.transactionRequest.setCustomer(
      new Customer(name, email, cpf, birthDate),
    );
  }

  public addContact(typeContact: string, numberContact: string): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    if (!this.transactionRequest.customer) {
      throw new Error('Customer not initialized.');
    }

    this.transactionRequest.customer.addContact(
      new Contact(typeContact, numberContact),
    );
  }

  public addBillingAddress(
    postalCode: string,
    street: string,
    number: string,
    completion: string,
    neighborhood: string,
    city: string,
    state: string,
  ): void {
    this.addAddress(
      'B',
      postalCode,
      street,
      number,
      completion,
      neighborhood,
      city,
      state,
    );
  }

  public addShippingAddress(
    postalCode: string,
    street: string,
    number: string,
    completion: string,
    neighborhood: string,
    city: string,
    state: string,
  ): void {
    this.addAddress(
      'D',
      postalCode,
      street,
      number,
      completion,
      neighborhood,
      city,
      state,
    );
  }

  public addAddress(
    typeAddress: string,
    postalCode: string,
    street: string,
    number: string,
    completion: string,
    neighborhood: string,
    city: string,
    state: string,
  ): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    if (!this.transactionRequest.customer) {
      throw new Error('Customer not initialized.');
    }

    this.transactionRequest.customer.addAddress(
      new Address(
        typeAddress,
        postalCode,
        street,
        number,
        completion,
        neighborhood,
        city,
        state,
      ),
    );
  }

  public addProduct(
    description: string,
    quantity: string,
    priceUnit: string,
    code: string,
    skuCode: string,
    extra: string = '',
    weight: string = '0',
  ): void {
    if (!this.transactionRequest && !this.cartRequest) {
      throw new Error('Client not initialized.');
    }

    const product = new Product(
      description,
      quantity,
      priceUnit,
      code,
      skuCode,
      extra,
      weight,
    );

    if (this.transactionRequest) {
      this.transactionRequest!.addProduct(product);
    } 

    if (this.cartRequest) {
      this.cartRequest!.addProduct(product);
    }
  }

  public addTransactionDetails(
    customerIp: string,
    shippingType: string,
    shippingPrice: string,
    urlNotification: string,
    free?: string,
    priceDiscount?: string,
    orderNumber?: string,
  ): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.transactionRequest.setTransactionDetails(
      new TransactionDetails(
        customerIp,
        shippingType,
        shippingPrice,
        urlNotification,
        free,
        priceDiscount,
        orderNumber,
      ),
    );
  }

  public addEstimatedDate(estimatedDate: string): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.transactionRequest.setTransactionTrace(
      new TransactionTrace(estimatedDate),
    );
  }

  public setPayment(payment: Payment): void {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.transactionRequest.setPayment(payment);
  }

  public getTransactionRequest(): TransactionRequest {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    return this.transactionRequest;
  }

  public getCartRequest(): CartRequest {
    if (!this.cartRequest) {
      throw new Error('Client not initialized.');
    }

    return this.cartRequest;
  }

  setupPayment(paymentMethod: string) {
    const payment = new Payment();
    payment.setPaymentMethodId(paymentMethod);
    this.setPayment(payment);
  }

  setupCreditCard(cardDetails: CardInterface) {
    const payment = new Payment();
    payment.setCardDetails(cardDetails);
    this.setPayment(payment);
  }

  public async createCreditCardTransaction(
    cardName: string,
    cardNumber: string,
    cardExpdateMonth: string,
    cardExpdateYear: string,
    cardCvv: string,
    split: string = '1',
  ): Promise<ApiResponseInterface> {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.setupCreditCard({
      cardName,
      cardNumber,
      cardExpdateMonth,
      cardExpdateYear,
      cardCvv,
      split,
    });

    try {
      const response = await axios.post<ApiResponseInterface>(
        `${this.baseURL}/api/v3/transactions/payment`,
        this.transactionRequest.toJson(),
        { headers: this.headers },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error creating transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async createPixTransaction(): Promise<ApiResponseInterface> {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.setupPayment('Pix');

    try {
      const response = await axios.post<ApiResponseInterface>(
        `${this.baseURL}/api/v3/transactions/payment`,
        this.transactionRequest.toJson(),
        { headers: this.headers },
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error creating transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async createBankSlipTransaction(): Promise<ApiResponseInterface> {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.setupPayment('Boleto');

    try {
      const response = await axios.post<ApiResponseInterface>(
        `${this.baseURL}/api/v3/transactions/payment`,
        this.transactionRequest.toJson(),
        { headers: this.headers },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error creating transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async createBankSlipPixTransaction(): Promise<ApiResponseInterface> {
    if (!this.transactionRequest) {
      throw new Error('Client not initialized.');
    }

    this.setupPayment('Bolepix');

    try {
      const response = await axios.post<ApiResponseInterface>(
        `${this.baseURL}/api/v3/transactions/payment`,
        this.transactionRequest.toJson(),
        { headers: this.headers },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error creating transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async createCartTransaction(): Promise<object> {
    if (!this.cartRequest) {
      throw new Error('Client not initialized.');
    }

    try {
      const response = await axios.post<any>(
        `${this.baseURL}/v1/tmp_transactions/create`,
        this.cartRequest.toJson(),
        { headers: this.headers },
      );

      return this.parseXml(response.data);
    } catch (error: any) {
      throw new Error(
        `Error creating transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async parseXml(xml: string): Promise<object> {
    const parser = new XMLParser();
    return parser.parse(xml);
  }

  public async addTrackingCode(
    transactionId: string,
    trackingCode: string,
  ): Promise<any> {
    try {
      const token = this.transactionRequest?.getTokenAccount();
      const response = await axios.post(
        `${this.baseURL}/api/v3/transactions/${transactionId}/tracking?token_account=${token}`,
        { tracking_code: trackingCode },
        { headers: this.headers },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error adding tracking code: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }

  public async queryTransaction(transactionId: string): Promise<any> {
    try {
      const token = this.transactionRequest?.getTokenAccount();
      const response = await axios.get(
        `${this.baseURL}/api/v3/transactions/get_by_token_brief?token_account=${token}&token_transaction=${transactionId}`,
        { headers: this.headers },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Error querying transaction: ${
          error.response ? error.response.data : error.message
        }`,
      );
    }
  }
}
