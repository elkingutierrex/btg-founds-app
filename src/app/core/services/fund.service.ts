import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Fund } from '../models/fund.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  timeOut = 300; // Simulated API response time in milliseconds
  private funds: Fund[] = [
    { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
    { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125000, category: 'FPV' },
    { id: 3, name: 'DEUDAPRIVADA', minAmount: 50000, category: 'FIC' },
    { id: 4, name: 'FDO-ACCIONES', minAmount: 250000, category: 'FIC' },
    { id: 5, name: 'FPV_BTG_PACTUAL_DINAMICA', minAmount: 100000, category: 'FPV' }
  ];

  constructor() { }

  getFunds(): Observable<Fund[]> {
    // Simulate API delay
    return of(this.funds).pipe(delay(this.timeOut));
  }

  getFundById(id: number): Observable<Fund | undefined> {
    const fund = this.funds.find(f => f.id === id);
    return of(fund).pipe(delay(this.timeOut));
  }
}
