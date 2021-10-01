import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
// import { MatDialog } from '@angular/material/dialog';
// import { OptDialogComponent } from '../opt-dialog/opt-dialog.component';
// import * as sidebarMenu from '../../sidebar-menu.json';

const InitialWidth = 6.4;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidenavWidth = InitialWidth;
  inputEntered: any;
  showMenu = false;
  finalData = [];
  constructor(private http: HttpClient, private common: CommonService) {}

  ngOnInit(): void {
    // this.getMenuOptions();
    this.common.details.subscribe(
      (onSuccess: any) => {
        const { token, url } = onSuccess;
        if (token && url) {
          this.getMenuOptions(token, url);
        }
      },
      (onErr) => {
        console.error('onErr: ', onErr);
      }
    );
  }

  login() {
    const credentials = {
      email: 'zaid.haider@shiprocket.in',
      password: 'shiviSH12@',
      device_id: '0b20495674384e66de255fa9fc677cde',
    };
    this.http
      .post<any>('https://qa-api-1.kartrocket.com/v1/auth/login', credentials)
      .subscribe(
        (res) => {
          // this.getMenuOptions();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getMenuOptions(token: string, baseUrl: string) {
    const url = `${baseUrl}/v1/settings/menu?v=1653&is_web=1`;
    const headers = this.getHeaders(token);

    this.http.get<any>(url, { headers }).subscribe((response) => {
      if (response.data) {
        this.showMenu = true;
      }
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

  submitOtp(enteredOtp: any) {
    const credentials = {
      email: 'zaid.haider@shiprocket.in',
      password: 'shiviSH12@',
      device_id: '0b20495674384e66de255fa9fc677cde',
      otp: enteredOtp,
    };
    this.http
      .post<any>('https://qa-api-1.kartrocket.com/v1/auth/login', credentials)
      .subscribe(
        (res) => {
          localStorage.setItem('satellizer_token', res.token);
          if (localStorage.getItem('satellizer_token')) {
            this.showMenu = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = InitialWidth;
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(OptDialogComponent, {
  //     width: '250px',
  //     data: ''
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     localStorage.setItem('satellizer_token',result);
  //     this.getMenuOptions();
  //   });
  // }
}
