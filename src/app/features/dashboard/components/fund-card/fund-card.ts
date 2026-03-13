import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Fund } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-fund-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './fund-card.html',
  styleUrl: './fund-card.scss'
})
export class FundCard {
  @Input() fund!: Fund;
  @Input() isSubscribed: boolean = false;
  @Input() canSubscribe: boolean = true;

  @Output() subscribe = new EventEmitter<Fund>();
  @Output() cancel = new EventEmitter<Fund>();

  onSubscribe() {
    this.subscribe.emit(this.fund);
  }

  onCancel() {
    this.cancel.emit(this.fund);
  }
}
