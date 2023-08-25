import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diplomski';
  data: any;

  constructor(
    private http: HttpClient,
  ) {
    this.http.get('http://127.0.0.1:8000/api/get-data').subscribe(data => {
      this.data = data;
      console.log("Data is coming.");
     
      }, error => console.error(error));
  }
}
