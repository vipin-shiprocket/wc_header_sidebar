import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opt-dialog',
  templateUrl: './opt-dialog.component.html',
  styleUrls: ['./opt-dialog.component.scss']
})
export class OptDialogComponent implements OnInit {
  otp:any="";
  constructor() { }

  ngOnInit(): void {
  }

}
