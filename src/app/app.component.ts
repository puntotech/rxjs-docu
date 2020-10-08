import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { SidenavService } from '@shared/services/sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  maxMobileDisplayWidth = 1000;
  isMobileDisplay: boolean;

  constructor(private sidenavService: SidenavService, private router: Router) {}

  ngOnInit() {
    this.isMobileDisplay = this.isMobileDisplayWidth(window.innerWidth);
    this.updateSidenav();

    this.router.events
      .pipe(filter((val) => val instanceof NavigationEnd))
      .subscribe((_) => this.updateSidenav());
  }

  ngAfterViewInit(): void {
    this.sidenavService.set(this.sidenav);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.isMobileDisplay = this.isMobileDisplayWidth(width);
    this.updateSidenav();
  }

  private updateSidenav() {
    this.sidenav.toggle(!this.isMobileDisplay);
  }

  private isMobileDisplayWidth(width: number) {
    return width < this.maxMobileDisplayWidth;
  }
}
