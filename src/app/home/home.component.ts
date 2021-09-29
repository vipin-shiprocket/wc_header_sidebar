import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() details: { token: string; url: string } = { token: '', url: '' };

  constructor(private common: CommonService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.common.details.next(this.details);
  }
}
