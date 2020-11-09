import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SettingsService } from '../../services/settings.service';

declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();

  }

}
