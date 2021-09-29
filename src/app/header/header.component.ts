import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userData: any = {};
  constructor(private http: HttpClient, private common: CommonService) {}

  ngOnInit(): void {
    this.common.details.subscribe(
      (onSuccess: any) => {
        const { token, url } = onSuccess;
        if (token && url) {
          this.getUserData(token, url);
        }
      },
      (onErr) => {
        console.error('onErr: ', onErr);
      }
    );
  }

  getUserData(token: string, baseUrl: string) {
    const url = `${baseUrl}/v1/auth/login/user?is_web=1&token=${token}`;
    const headers = this.getHeaders(token);
    this.http.get<any>(url, { headers }).subscribe((response) => {
      this.userData = response;
    });
  }

  getHeaders(token: string): HttpHeaders {
    // const token = localStorage.getItem('satellizer_token');
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'No-Auth': 'True',
    });
    return headers;
  }
}
