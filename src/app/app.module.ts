import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersTestComponent } from './users-test/users-test.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarComponent } from './services/snack-bar/snack-bar/snack-bar.component';
import { MsgDialogTemplateComponent } from './services/msg-dialog/msg-dialog-template/msg-dialog-template.component';
import { TranslatePipe } from './services/translations/translate.pipe';
import { InputDialogTemplateComponent } from './services/input-dialog/input-dialog-template/input-dialog-template.component';
import { ConfirmDialogTemplateComponent } from './services/confirm-dialog/confirm-dialog-template/confirm-dialog-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AdminLoginComponent } from './login/adminLogin/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    UsersTestComponent,
    LoginComponent,
    SnackBarComponent,
    MsgDialogTemplateComponent,
    TranslatePipe,
    InputDialogTemplateComponent,
    ConfirmDialogTemplateComponent,
    AppLayoutComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
