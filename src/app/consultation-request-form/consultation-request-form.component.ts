import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultationRequestsService } from './service/consultation-requests.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { Professor } from '../models/professor';
import { Student } from '../models/student';
import { ConsultationRequest } from '../models/consultationRequest';
import { SnackBarService } from '../services/snack-bar/snack-bar.service';
import { User } from '../models/user';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';
import { formatDate } from '@angular/common';
import { ConfirmDialogService } from '../services/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-consultation-request-form',
  templateUrl: './consultation-request-form.component.html',
  styleUrls: ['./consultation-request-form.component.scss']
})
export class ConsultationRequestFormComponent {
  isLoading: boolean = false;
  consultationForm: FormGroup;
  startDate = new Date();
  today: Date;

  allTimeSlots: string[] = [];
  startTimeSlots: string[] = [];
  endTimeSlots: string[] = [];
  bookedAppointments: ConsultationRequest[] = [];

  user: User = new User();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConsultationRequestFormComponent>,
    public consultationRequestsService: ConsultationRequestsService,
    public loggedInUserService: LoggedInUserService,
    public snackBar: SnackBarService,
    public confirmDialog: ConfirmDialogService,
    public errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      professor: Professor,
    },
  ) {
    this.consultationForm = this.fb.group({
      date: [null, Validators.required],
      startTime: [null, [Validators.required, this.validateTime]],
      endTime: [null, [Validators.required, this.validateTime]],
      type: [null, Validators.required],
      note: [null]
    });

    this.today = new Date();
  }

  ngOnInit(): void {
    this.loadUser();

    for (let i = 8; i <= 19; i++) {
      for (let j = 0; j <= 30; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        this.allTimeSlots.push(`${hour}:${minute}`);
      }
    }
    this.startTimeSlots = [...this.allTimeSlots];
    this.endTimeSlots = [...this.allTimeSlots];
    this.consultationForm = this.fb.group({
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      type: [null, Validators.required],
      note: [null]
    }, { validators: this.validateTime });


    this.consultationForm.get('date')?.valueChanges.subscribe(selectedDate => {
      if (selectedDate) {
        let formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
        this.loadConsultationRequests(formattedDate);
        this.filterBookedTimeSlots(this.bookedAppointments);
      }
    });
  }

  loadUser() {
    this.isLoading = true;
    this.loggedInUserService.details().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.user = res;
        console.log("user", this.user);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorHandler.process(err);
      }
    });
  }

  dateFilter = (date: Date | null) => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return date && date >= current;
  };

  loadConsultationRequests(date: any) {
    this.isLoading = true;
    this.consultationRequestsService.getBookedAppointmentsForProfessor(date, this.data.professor).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.bookedAppointments = res.consultationRequests;
        this.filterBookedTimeSlots(this.bookedAppointments);
      },

      error: (err) => {
        this.isLoading = false;
        this.errorHandler.process(err);
      }
    });
  }

  filterBookedTimeSlots(bookedAppointments: ConsultationRequest[]) {
    this.startTimeSlots = [...this.allTimeSlots];
    this.endTimeSlots = [...this.allTimeSlots];

    bookedAppointments.forEach(appointment => {
      const startTime = appointment.startTime!.split(' ')[1].substring(0, 5);
      const endTime = appointment.endTime!.split(' ')[1].substring(0, 5);

      const startIndex = this.allTimeSlots.indexOf(startTime);
      const endIndex = this.allTimeSlots.indexOf(endTime);

      for (let i = startIndex; i <= endIndex; i++) {
        const timeToRemove = this.allTimeSlots[i];
        this.startTimeSlots = this.startTimeSlots.filter(time => time !== timeToRemove);
        this.endTimeSlots = this.endTimeSlots.filter(time => time !== timeToRemove);
      }
    });
  }
  onStartTimeChange() {
    const selectedStartTime = this.consultationForm.get('startTime')?.value;
    const index = this.allTimeSlots.indexOf(selectedStartTime);
    this.endTimeSlots = this.allTimeSlots.slice(index + 1);

    // Filter out the times that are not available based on booked appointments
    this.filterEndTimeSlotsBasedOnBookedAppointments(selectedStartTime);
  }

  onEndTimeChange() {
    const selectedEndTime = this.consultationForm.get('endTime')?.value;
    const index = this.allTimeSlots.indexOf(selectedEndTime);
    this.startTimeSlots = this.allTimeSlots.slice(0, index);

    // Filter out the times that are not available based on booked appointments
    this.filterStartTimeSlotsBasedOnBookedAppointments(selectedEndTime);
  }

  filterEndTimeSlotsBasedOnBookedAppointments(selectedStartTime: string) {
    // Assuming bookedAppointments is available in this scope
    this.endTimeSlots = this.endTimeSlots.filter(endTime => {
      return !this.isTimeSlotInAnyBookedAppointment(selectedStartTime, endTime);
    });
  }

  filterStartTimeSlotsBasedOnBookedAppointments(selectedEndTime: string) {
    // Assuming bookedAppointments is available in this scope
    this.startTimeSlots = this.startTimeSlots.filter(startTime => {
      return !this.isTimeSlotInAnyBookedAppointment(startTime, selectedEndTime);
    });
  }

  isTimeSlotInAnyBookedAppointment(startTime: string, endTime: string): boolean {
    // Assuming bookedAppointments is available in this scope
    for (const appointment of this.bookedAppointments) {
      const appointmentStartTime = appointment.startTime!.split(' ')[1].substring(0, 5);
      const appointmentEndTime = appointment.endTime!.split(' ')[1].substring(0, 5);

      if ((startTime >= appointmentStartTime && startTime < appointmentEndTime) ||
        (endTime > appointmentStartTime && endTime <= appointmentEndTime) ||
        (startTime <= appointmentStartTime && endTime >= appointmentEndTime)) {
        return true;
      }
    }
    return false;
  }
  validateTime(formGroup: FormGroup): { [key: string]: any } | null {
    const startTime = formGroup.get('startTime')?.value;
    const endTime = formGroup.get('endTime')?.value;

    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);

      if (end <= start) {
        return { 'timeInvalid': true };
      }
    }
    return null;
  }

  clearStartTime() {
    this.consultationForm.get('startTime')?.setValue(null);
  }

  clearEndTime() {
    this.consultationForm.get('endTime')?.setValue(null);
  }

  cancel() {
    if (this.consultationForm.dirty) {
      this.confirmDialog.open("Da li ste sigurni da ne želite poslati zahtjev?").subscribe({
        next: (confirmed) => {
          if (confirmed) {
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.errorHandler.process(err);
        }
      });

      return;
    }
    this.dialogRef.close();
  }
  save() {
    if (this.consultationForm.valid) {
      this.isLoading = true;
      this.consultationRequestsService.storeConsultationRequest(this.consultationForm.value, this.data.professor, this.user, this.consultationForm.get('date')?.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBar.open("Zahtjev za konzultacije je uspješno poslan!", { duration: 3000 });
          this.dialogRef.close(res.consultationRequest);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorHandler.process(err);
        }
      });

    }
    else {
      this.snackBar.open("Greška! Molimo Vas, provjerite podatke u formi!", { duration: 3000 });
    }
  }
}
