import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'papx-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  appVersion = '1.0.5 (01/07/2021: 13:00:00)';
  constructor() {}

  ngOnInit() {}
}
