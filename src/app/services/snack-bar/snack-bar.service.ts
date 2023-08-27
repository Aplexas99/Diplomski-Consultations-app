import { Injectable } from '@angular/core';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(public matSnackBar: MatSnackBar) { }

  open(text: string, config: MatSnackBarConfig = {}) {
    config.data = {
      text: text,
    };
    this.matSnackBar.openFromComponent(SnackBarComponent, config);
  }

  dismiss() {
    this.matSnackBar.dismiss();
  }
}
