export type TransactionType = 'SUBSCRIBE' | 'CANCEL';

export interface Transaction {
  id: string;
  type: TransactionType;
  fundId: number;
  fundName: string;
  date: Date;
  amount: number;
  notificationType?: 'SMS' | 'EMAIL';
}
