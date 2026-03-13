import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserStateService } from '../../core/services/user-state.service';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'fundName', 'type', 'amount', 'notificationType'];

  constructor(
    private userStateService: UserStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userStateService.getState().subscribe(state => {
      this.transactions = state.transactions;
      this.cdr.markForCheck();
    });
  }
}

