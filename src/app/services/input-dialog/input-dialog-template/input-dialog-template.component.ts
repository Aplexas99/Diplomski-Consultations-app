import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog-template',
  templateUrl: './input-dialog-template.component.html',
  styleUrls: ['./input-dialog-template.component.scss']
})
export class InputDialogTemplateComponent implements OnInit {
  placeholder = '';
  input = '';
  defaultConfirmButtonText = 'Confirm';
  defaultCancelButtonText = 'Cancel';

  constructor(
    public dialogRef: MatDialogRef<InputDialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
    input: {
      placeholder: string,
      defaultValue: string
    },
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
  }) { }

  ngOnInit() {
    if(this.data.input && this.data.input.defaultValue) {
      this.input = this.data.input.defaultValue
    }
  }

  confirm() {
    this.dialogRef.close(this.input);
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
