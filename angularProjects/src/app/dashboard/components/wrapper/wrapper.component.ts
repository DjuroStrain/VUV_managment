import { flatten } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from "jquery";
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-720px'})),
      transition('* => *', [
        style({left: '-720px'}),
        animate(10000, style({left: '100%'}))
      ])
    ])
  ]
})
export class WrapperComponent implements OnInit {

  isExpanded: boolean = false;
  constructor(public _router: Router, public projects: ProjectsComponent) {
  }

 state: number = 0;

  ngOnInit(): void {

  }

  scrollDone(): void {
    this.state++;
  }

  getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
    $('#head-text').css('color',color);
  }
}
