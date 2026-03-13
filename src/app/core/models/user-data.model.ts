import { Transaction } from './transaction.model';

export interface UserData {
  balance: number;
  activeSubscriptions: number[];
  transactions: Transaction[];
}
