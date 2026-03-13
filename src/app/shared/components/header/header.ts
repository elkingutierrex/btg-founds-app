import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserStateService } from '../../../core/services/user-state.service';
import { UserData } from '../../../core/models/user-data.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  userData$;

  constructor(private userStateService: UserStateService) {
    this.userData$ = this.userStateService.getState();
  }
}
