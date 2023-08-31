import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

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
