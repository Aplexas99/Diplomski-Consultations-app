import { Injectable } from '@angular/core';
import { MsgDialogComponent } from './msg-dialog/msg-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsgDialogService {

  public dialogRef!: MatDialogRef<MsgDialogComponent>;

  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   *
   * @param text
   * @param autoClose seconds
   * @returns
   */
  open(text: string | string[], autoClose: number = 0): Observable<boolean> {
    this.dialogRef = this.dialog.open(MsgDialogComponent, {
      width: '400px',
      data: {
        text: text,
        autoClose: autoClose,
      },
    });
    return this.dialogRef.afterClosed();
  }

  close() {
    this.dialogRef.close();
  }
}
