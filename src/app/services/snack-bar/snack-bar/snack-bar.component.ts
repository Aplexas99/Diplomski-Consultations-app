import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(
    public matSnackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: { text: string },
    ) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.matSnackBar.dismiss();
  }

}