import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly INITIAL_BALANCE = 500000;
  
  private state = new BehaviorSubject<UserData>({
    balance: this.INITIAL_BALANCE,
    activeSubscriptions: [],
    transactions: []
  });

  constructor() {}

  getState(): Observable<UserData> {
    return this.state.asObservable();
  }

  getCurrentState(): UserData {
    return this.state.getValue();
  }

  subscribeToFund(
    fundId: number, 
    fundName: string, 
    amount: number, 
    notificationType: 'SMS' | 'EMAIL'
  ): { success: boolean; message?: string } {
    const currentState = this.getCurrentState();

    if (currentState.balance < amount) {
      return { success: false, message: 'Insufficient balance to subscribe to this fund.' };
    }

    if (currentState.activeSubscriptions.includes(fundId)) {
      return { success: false, message: 'You are already subscribed to this fund.' };
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'SUBSCRIBE',
      fundId,
      fundName,
      date: new Date(),
      amount,
      notificationType
    };

    this.state.next({
      ...currentState,
      balance: currentState.balance - amount,
      activeSubscriptions: [...currentState.activeSubscriptions, fundId],
      transactions: [newTransaction, ...currentState.transactions]
    });

    return { success: true };
  }

  cancelSubscription(fundId: number, fundName: string, amount: number): { success: boolean; message?: string } {
    const currentState = this.getCurrentState();

    if (!currentState.activeSubscriptions.includes(fundId)) {
      return { success: false, message: 'You are not subscribed to this fund.' };
    }

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'CANCEL',
      fundId,
      fundName,
      date: new Date(),
      amount
    };

    this.state.next({
      ...currentState,
      balance: currentState.balance + amount,
      activeSubscriptions: currentState.activeSubscriptions.filter(id => id !== fundId),
      transactions: [newTransaction, ...currentState.transactions]
    });

    return { success: true };
  }
}
