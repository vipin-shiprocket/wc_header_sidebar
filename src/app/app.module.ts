import { DoBootstrap, Injector, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { AppComponent } from './app.component'; // comment this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { Routes } from '@angular/router';
// import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OptDialogComponent } from './opt-dialog/opt-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { createCustomElement } from '@angular/elements';

// const appRoutes: Routes = [
//   { path: '', component:SidebarComponent},
//   { path: 'head', component:HeaderComponent},
//   { path: 'home', component:HomeComponent}

// ];

@NgModule({
  declarations: [
    // AppComponent,  // comment this line
    SidebarComponent,
    OptDialogComponent,
    HeaderComponent,
    HomeComponent,
  ],
  exports: [MatSidenavModule],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    // RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    // RouterModule.forRoot([])
  ],
  providers: [],
  // bootstrap: [AppComponent]  // comment this line
  entryComponents: [HomeComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector, private ngZone: NgZone) {
    (window as any).ngZone = this.ngZone;
  }

  ngDoBootstrap() {
    const el = createCustomElement(HomeComponent, {
      injector: this.injector,
    });

    customElements.define('header-sidebar-comp', el);
  }
}
