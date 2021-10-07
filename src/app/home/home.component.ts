import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() token: string = '';
  @Input() url: string = '';
  @Output() recharge = new EventEmitter();
  @Output() goToPage = new EventEmitter();

  constructor(private common: CommonService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.token && this.url) {
      const details = { token: this.token, url: this.url };
      this.common.details.next(details);
      console.log('this.details', details);
    }
  }

  onClickRecharge(evt: boolean): void {
    this.recharge.emit(evt);
  }

  onClickGoToPage(evt: string): void {
    console.log('>> go to page: ', evt);
    this.goToPage.emit(evt);
  }
}
