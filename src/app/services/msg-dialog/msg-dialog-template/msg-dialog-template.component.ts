import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-dialog-template',
  templateUrl: './msg-dialog-template.component.html',
  styleUrls: ['./msg-dialog-template.component.scss']
})
export class MsgDialogTemplateComponent implements OnInit, OnDestroy {
  text: string[] = [];
  countdownInterval!: ReturnType<typeof setInterval>;

  constructor(
    public dialogRef: MatDialogRef<MsgDialogTemplateComponent>,
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
