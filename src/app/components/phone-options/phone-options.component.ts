import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-phone-options',
  templateUrl: './phone-options.component.html',
  styleUrls: ['./phone-options.component.scss'],
})
export class PhoneOptionsComponent implements OnInit {

  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {}
}
