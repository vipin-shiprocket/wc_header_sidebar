import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() token: string = '';
  @Input() url: string = '';

  constructor(private common: CommonService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.token && this.url) {
      const details = { token: this.token, url: this.url };
      this.common.details.next(details);
      console.log('this.details', details);
    }
  }
}
