import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogTemplateComponent } from './input-dialog-template/input-dialog-template.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(private dialog: MatDialog) { }

  open(text: string, input?: { placeholder: string, defaultValue?: string }, confirmButtonText?: string, cancelButtonText?: string): Observable<string> {
    return this.dialog.open(InputDialogTemplateComponent, {
      width: '400px',
      data: {
        text: text,
        input: input,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
      },
    }).afterClosed();
  }
}
