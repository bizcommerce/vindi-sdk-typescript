import { MessageResponseInterface } from './MessageResponseInterface';

export interface ApiResponseInterface {
  message_response: MessageResponseInterface;
  data_response?: any;
  error_response?: any;
  additional_data?: any;
}
