import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  async showSuccess(title: string, text: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3f51b5'
    });
  }

  async showError(title: string, text: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#f44336'
    });
  }

  async confirmAction(title: string, text: string, confirmButtonText: string = 'Confirm'): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
      confirmButtonText,
      cancelButtonText: 'Cancel'
    });
    return result.isConfirmed;
  }
}
