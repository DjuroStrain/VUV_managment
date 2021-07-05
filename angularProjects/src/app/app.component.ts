import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VUV managment';

  constructor(private title2: Title){ }

  ngOnInit(){
    this.title2.setTitle("VUV managment");
  }
}
