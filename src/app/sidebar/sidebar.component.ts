import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { NavigationStart, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import * as sidebarMenu from './sidebar-menu.json';
// import { filter } from 'rxjs/operators';
// import { MatDialog } from '@angular/material/dialog';
// import { OptDialogComponent } from '../opt-dialog/opt-dialog.component';
// import * as sidebarMenu from '../../sidebar-menu.json';

const InitialWidth = 15;
const MenuJson = {
  dashboard: {
    text: 'Dashboard',
    icon: 'dashboard',
    sref: 'app.dashboard',
    url: 'dashboard',
  },
  track: {
    text: 'Track',
    sref: 'app.tracking',
    icon: 'track_changes',
    url: 'tracking',
  },
  process_ndr: {
    text: 'Process NDR',
    sref: 'app.ndrPending',
    icon: 'domain',
    url: 'ndr-pending',
    isExternal: true,
  },
  rto: {
    text: 'RTO',
    sref: 'app.rtoInitiated',
    icon: 'folder_shared',
    url: 'rto-initiated',
    isExternal: true,
  },
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() goToPage = new EventEmitter<string>();
  sidenavWidth = InitialWidth;
  inputEntered: any;
  showMenu = false;
  finalData: any[] = [];
  sidemenu: Record<string, any> = {};
  sidemenuKeys: string[] = [];
  objectvalues = Object.values;
  constructor(private http: HttpClient, private common: CommonService) {}

  ngOnInit(): void {
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

  onClickNav(evt: Event, url: string) {
    // const { url } = this.sidemenu[menuKey] || {};
    console.log(url);
    
    if (!url) {
      evt.preventDefault();
      this.goToPage.emit(url);
    }
  }

  getMenuOptions(token: string, baseUrl: string) {
    let url = `${baseUrl}/v1/settings/menu?is_web=1`;
    // const url = `${baseUrl}/v1/settings/menu?v=1653&is_web=1`;
    const headers = this.getHeaders(token);

    this.http.get<any>(url, { headers }).subscribe((response) => {
      let apimenu: any = sidebarMenu;
      let apimenuKey = Object.keys(apimenu);
      let jsondata = response['data'];
      this.showMenu = true;
      for (let data in jsondata) {

        if (apimenuKey.indexOf(data) !== -1) {
          if (jsondata[data] !== true) {
            let menuData: any = {};
            let submenuData: any = [];
            menuData['text'] = apimenu[data].text;
            menuData['icon'] = apimenu[data].icon;
            menuData['url'] = apimenu[data].url;
            let submenuKeys = Object.keys(jsondata[data]);
            let submenuKeysValue = {};
            for (let i = 0; i < submenuKeys.length; i++) {
              const subMenuKey = submenuKeys[i];

              if (jsondata[data][subMenuKey] && apimenu[data]?.submenu) {
                submenuKeysValue = apimenu[data]?.submenu[subMenuKey];
                submenuData.push(submenuKeysValue);
              }
            }
            if (submenuData.length > 0) {
              menuData['submenu'] = submenuData;
            }
            this.finalData.push(menuData);
          } else {
            if (!Array.isArray(jsondata[data])) {
              let singleMenuData: any = {};
              singleMenuData['text'] = apimenu[data].text;
              singleMenuData['icon'] = apimenu[data].icon;
              singleMenuData['url'] = apimenu[data].url;
              this.finalData.push(apimenu[data]);
            }
          }
        }
      }

    });
  }

  getHeaders(token: string): HttpHeaders {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'No-Auth': 'True',
    });
    return headers;
  }

  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = InitialWidth;
  }
}
