import { Component, OnInit } from '@angular/core';
import api from '@assets/api.json';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
})
export class ApiComponent implements OnInit {
  apiData = api;

  apiTypes = {
    Class: 'C',
    Const: 'K',
    Decorator: '@',
    Directive: 'D',
    Enum: 'E',
    Function: 'F',
    Interface: 'I',
    Pipe: 'P',
    'Type-Alias': 'T',
  };

  constructor() {}

  ngOnInit(): void {}

  preserveOrder(a, b) {
    return a;
  }
}
