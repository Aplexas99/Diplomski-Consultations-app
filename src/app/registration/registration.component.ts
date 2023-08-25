import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post('http://127.0.0.1:8000/api/register', userData);
  }

  register(userData: any) {
    this.registerUser(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Redirect to a success page or perform other actions
      },
      (error) => {
        console.error('Registration error:', error);
        // Display error message to the user or handle the error
      }
    );
  }
  
}
