import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationRequestsService } from 'src/app/consultation-request-form/service/consultation-requests.service';
import { AuthService } from 'src/app/login/auth.service';
import { ConsultationRequest } from 'src/app/models/consultationRequest';
import { Professor } from 'src/app/models/professor';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog/confirm-dialog.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { InputDialogService } from 'src/app/services/input-dialog/input-dialog.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-request-details-form',
  templateUrl: './request-details-form.component.html',
  styleUrls: ['./request-details-form.component.scss']
})
export class RequestDetailsFormComponent {
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<RequestDetailsFormComponent>,
    public inputDialog: InputDialogService,
    public authService: AuthService,
    public consultationRequestsService: ConsultationRequestsService,
    public snackBar: SnackBarService,
    public confirmDialog: ConfirmDialogService,
    public errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      request: ConsultationRequest,
      professor: any,
    },
  ) {
  }

  ngOnInit(): void {

  }


  onAccept() {
    this.inputDialog.open("Unesite lokaciju", {placeholder: "Lokacija", defaultValue:""}, "Potvrdi", "Odustani").subscribe({
      next: (res) => {
        if (res) {
          this.data.request.location = res;
          this.acceptConsultationRequest();
        }
      },
      error: (err) => {
        this.errorHandler.process(err);
      }
    });
    
  }

  onDecline() {
    this.inputDialog.open("Jeste li sigurni da želite odbiti zahtjev za konzultacijom?",{placeholder: "Razlog", defaultValue:""}, "Odbij zahtjev", "Odustani").subscribe({
      next: (res) => {
        if (res) {
          this.data.request.reason = res;
          this.rejectConsultationRequest();
        }
        return;
      }
    });
  }

  acceptConsultationRequest() {
    this.isLoading = true;
    this.consultationRequestsService.acceptConsultationRequest(this.data.request).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.snackBar.open('Prihvaćen zahtjev za konzultacijom', { duration: 2000 });
      this.dialogRef.close();
    },
    error: (err) => {
      this.isLoading = false;
      this.snackBar.open('Greška, ponovna prijava...', { duration: 2000 });
   /*   this.authService.getGoogleAuthUrl().subscribe({
        next: (res) => {
          window.open(res, "_self");
        },
        error: (err) => {
          this.errorHandler.process(err);
        }
      });*/
      this.errorHandler.handleError(err);
    }
  });
  }

  rejectConsultationRequest() {
    this.isLoading = true;
    this.consultationRequestsService.rejectConsultationRequest(this.data.request).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Odbijen zahtjev za konzultacijom', { duration: 2000 });
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorHandler.process(err);
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }


}
