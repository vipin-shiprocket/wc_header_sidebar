import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  details = new BehaviorSubject({});

  constructor() {
    // this.details.subscribe({
    //   next: (value) => {},
    // });
  }
}
