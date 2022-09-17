import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../service/authentication.service';
import {isAvailable} from '../../shared/function-util';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private toast: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authenticationService.currentUserValue();
    const canActivate = isAvailable(route.data.privileges, currentUser.authorities);

    if (!canActivate) {
      this.toast.warning(`Vous n'êtes pas autorisé à afficher cette page`, 'Avertissement');
      setTimeout(() => {
        this.router.navigate(['/home']).then();
      }, 2000);
    }

    return canActivate;
  }

}
