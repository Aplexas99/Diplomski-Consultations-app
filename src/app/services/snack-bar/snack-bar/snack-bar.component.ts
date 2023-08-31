import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

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
