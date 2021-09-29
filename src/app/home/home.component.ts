import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() token:any;
  @Input() url:any;
  isToken:boolean=false;
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('satellizer_token',this.token);
    if(localStorage.getItem('satellizer_token')){
      this.isToken=true;
    }
  }


  addToken(){
    localStorage.setItem('satellizer_token',this.token);
    this.isToken = true;
  }
}
