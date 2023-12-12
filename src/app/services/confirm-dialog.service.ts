import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../variables/popup/popup.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) {}
  openConfirmDialog(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: title,
        message: message,
        confirmText: 'Confirmer', // Adjust as needed
        confirmColor: 'primary', // Adjust as needed
      },
    });

    return dialogRef.afterClosed();
  }
}
