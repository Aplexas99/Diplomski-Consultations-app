import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-dialog',
  templateUrl: './msg-dialog.component.html',
  styleUrls: ['./msg-dialog.component.scss']
})
export class MsgDialogComponent {
  text: string[] = [];
  countdownInterval!: ReturnType<typeof setInterval>;

  constructor(
    public dialogRef: MatDialogRef<MsgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      text: string | string[],
      autoClose: number,
    },
  ) { }

  ngOnInit() {
    if(typeof this.data.text == 'string') {
      this.text = [ this.data.text ];
    }
    else {
      this.text = this.data.text;
    }
    if(this.data.autoClose) {
      this.countdownInterval = setInterval(() => {
        this.data.autoClose--;
        if(this.data.autoClose == 0) {
          this.clearInterval();
          this.dialogRef.close(true);
        }
      }, 1000);
    }
  }
  ngOnDestroy(): void {
    this.clearInterval();
  }

  clearInterval() {
    if(this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  confirm() {
    this.clearInterval();
    this.dialogRef.close(true);
  }

}
