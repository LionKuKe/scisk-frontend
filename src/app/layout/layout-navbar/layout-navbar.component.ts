import {Component, Input, HostBinding, OnInit} from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import {AuthenticationService} from '../../authentication/service/authentication.service';
import {UserModel} from '../../authentication/model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  currentUser: UserModel;

  constructor(
    private appService: AppService,
    private layoutService: LayoutService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.isRTL = appService.isRTL;
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigate(['/login']).then();
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue();
  }
}
