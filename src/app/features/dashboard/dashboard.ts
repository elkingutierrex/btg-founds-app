import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FundCard } from './components/fund-card/fund-card';
import { SubscribeDialog, SubscribeDialogData } from './components/subscribe-dialog/subscribe-dialog';
import { FundService } from '../../core/services/fund.service';
import { UserStateService } from '../../core/services/user-state.service';
import { NotificationService } from '../../core/services/notification.service';
import { Fund } from '../../core/models/fund.model';
import { UserData } from '../../core/models/user-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule, FundCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  funds: Fund[] = [];
  userData!: UserData;
  loading: boolean = true;

  constructor(
    private fundService: FundService,
    private userStateService: UserStateService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userStateService.getState().subscribe(state => {
      this.userData = state;
      this.cdr.markForCheck();
    });

    this.fundService.getFunds().subscribe({
      next: (data) => {
        this.funds = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
        this.notificationService.showError('Error loading funds', 'Please try again later.');
      }
    });
  }

  isSubscribed(fundId: number): boolean {
    return this.userData.activeSubscriptions.includes(fundId);
  }

  canSubscribe(fund: Fund): boolean {
    return this.userData.balance >= fund.minAmount;
  }

  openSubscribeDialog(fund: Fund) {
    if (!this.canSubscribe(fund)) {
      this.notificationService.showError(
        'Insufficient Balance', 
        `You need at least ${this.formatCurrency(fund.minAmount)} to subscribe to this fund.`
      );
      return;
    }

    const dialogRef = this.dialog.open(SubscribeDialog, {
      width: '400px',
      data: { fund, maxAmount: this.userData.balance } as SubscribeDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processSubscription(fund, result.amount, result.notificationPref);
      }
    });
  }

  private processSubscription(fund: Fund, amount: number, notificationType: 'SMS' | 'EMAIL') {
    const res = this.userStateService.subscribeToFund(fund.id, fund.name, amount, notificationType);
    
    if (res.success) {
      this.notificationService.showSuccess('Subscription Successful', `You successfully subscribed to ${fund.name.replace(/_/g, ' ')} for ${this.formatCurrency(amount)}. Notification will be sent via ${notificationType}.`);
    } else {
      this.notificationService.showError('Subscription Failed', res.message || 'Unknown error occurred.');
    }
  }

  async cancelSubscription(fund: Fund) {
    const confirmed = await this.notificationService.confirmAction(
      'Cancel Subscription?',
      `Are you sure you want to cancel your subscription to ${fund.name.replace(/_/g, ' ')}? The invested amount will be returned to your balance.`,
      'Yes, cancel it'
    );

    if (confirmed) {
      const subscriptions = this.userData.transactions.filter(t => t.fundId === fund.id && t.type === 'SUBSCRIBE');
      let amountToReturn = fund.minAmount;
      
      if (subscriptions.length > 0) {
        amountToReturn = subscriptions[0].amount;
      }

      const res = this.userStateService.cancelSubscription(fund.id, fund.name, amountToReturn);
      if (res.success) {
        this.notificationService.showSuccess('Subscription Cancelled', `You have been refunded ${this.formatCurrency(amountToReturn)}.`);
      } else {
        this.notificationService.showError('Cancellation Failed', res.message || 'Error occurred.');
      }
    }
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  }
}
