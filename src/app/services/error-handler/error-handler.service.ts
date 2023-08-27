import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { MsgDialogService } from '../msg-dialog/msg-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    protected snackBar: SnackBarService,
    protected msgDialog: MsgDialogService,
  ) { }

  process(error: HttpErrorResponse) {
    console.error(error);
    this.snackBar.dismiss();
    let errorMsg = [ 'Sorry! Error occurred.', error.status + ': ' + error.statusText ];
    if(error.error && error.error.error && typeof error.error.error == 'string') {
      errorMsg.push(error.error.error);
    }
    else if(error.error && error.error.errors) {
      for (const [key, value] of Object.entries(error.error.errors)) {
        errorMsg.push('' + value);
      }
    }
    else if(error.error && typeof error.error == 'string') {
      errorMsg.push(error.error);
    }
    this.msgDialog.open(errorMsg);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error
      console.error(error);
    } else {
      // The backend returned an unsuccessful response code
      if(error.status == 401) {
        alert('Your api token has expired. You will be logged out.');
        localStorage.removeItem('api_token');
        window.location.reload();
      }
      else if(error.status == 429) {
        alert('API reached maximum number of requests in a minute. Wait 1 minute and refresh the page.\n\nThis is for security reasons. If this error occurs often, please contact the support.');
      }
      console.error(error);
    }
    // return an observable with a user-facing error message
    return throwError(error);
 }
}
