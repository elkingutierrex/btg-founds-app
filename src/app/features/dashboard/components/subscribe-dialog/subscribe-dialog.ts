import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Fund } from '../../../../core/models/fund.model';

export interface SubscribeDialogData {
  fund: Fund;
  maxAmount: number;
}

@Component({
  selector: 'app-subscribe-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './subscribe-dialog.html',
  styleUrl: './subscribe-dialog.scss'
})
export class SubscribeDialog implements OnInit {
  subscribeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubscribeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SubscribeDialogData
  ) {}

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      amount: [
        this.data.fund.minAmount, 
        [
          Validators.required, 
          Validators.min(this.data.fund.minAmount),
          Validators.max(this.data.maxAmount)
        ]
      ],
      notificationPref: ['EMAIL', Validators.required]
    });
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      this.dialogRef.close(this.subscribeForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
