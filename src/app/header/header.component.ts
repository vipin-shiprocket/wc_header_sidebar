import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData:any={};
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.http.get<any>('https://qa-api-1.kartrocket.com/v1/auth/login/user?is_web=1&token='+localStorage.satellizer_token,
    { headers:this.getHeaders()}).subscribe(response => {
        this.userData = response;
   });
  }

  getHeaders(): HttpHeaders {
    const token  = localStorage.getItem('satellizer_token');
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'No-Auth': 'True'
    });
    return headers;
  }

}
