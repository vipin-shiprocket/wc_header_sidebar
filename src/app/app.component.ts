import { Component } from '@angular/core';

const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vcWEtYXBpLTEua2FydHJvY2tldC5jb20vdjEvYXV0aC9sb2dpbiIsImlhdCI6MTYzMzMzOTY5OSwiZXhwIjoxNjM0MjAzNjk5LCJuYmYiOjE2MzMzMzk2OTksImp0aSI6IkxFQmpJRjE0M1V2Q0RMbDkifQ.y-Zm6Wqx8WyYwQ58aCEcG3qKx-6KQoKzPVtI7tzbwuo';
const BASE_URL = 'https://qa-api-1.kartrocket.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wc-header-sidebar';
  token = TOKEN;
  url = BASE_URL;
}
