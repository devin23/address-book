import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-text',
  templateUrl: './view-text.component.html',
  styleUrls: ['./view-text.component.scss'],
})
export class ViewTextComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {}

}
