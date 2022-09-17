import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RefreshTokenRequest} from '../model/refresh-token-request';

/**
 * @author Ivan Kaptue
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private options: Partial<IndividualConfig> = {closeButton: true};
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toast: ToastrService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.error instanceof ErrorEvent) {
            // Client side error
            this.toast.error(`${err.error.message}`, `Erreur`, this.options);
          } else {
            switch (err.status) {
              case 0:
                this.toast.error(`Vérifiez votre connexion internet et réessayez`, `Pas de connexion`, this.options);
                break;
              case 400: // Validations error
                this.toast.error(`Veuillez renseigner les bonnes informations`, `Code erreur: ${err.status}`, this.options);
                break;
              case 401: // Unauthorized
                if (!req.url.includes('authenticate')) {
                  return this.handle401Error(req, next);
                }
                break;
              case 403: // Forbidden
                if (!req.url.includes('refresh-token')) {
                  this.toast.error(`Vous n'avez pas accès à cette ressource`, `Code erreur: ${err.status}`, this.options);
                }
                break;
              case 409 : // Conflict
                const conflictErrorMessage = err.error.operationMessage.toString();
                switch (conflictErrorMessage) {
                  case 'site':
                    this.toast.error(`Aucun site configuré pour cet utilisateur !!!`, 'Erreur');
                    break;
                }
                break;
              case 500:
                this.toast.error(`Une error est survenue. Bien vouloir contacter l'administrateur`,
                  `Code erreur: ${err.status}`, this.options);
                break;
              case 412:
                const errorMessage = err.error.operationMessage.toString();
                this.toast.error('Erreur ', `Erreur sur le format du fichier`);
                break;
            }
          }
        }

        return throwError(err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const currentUser = this.authenticationService.currentUserValue();
      const refreshToken = currentUser?.refreshToken;

      if (!!refreshToken) {
        const refTok = new RefreshTokenRequest();
        refTok.refreshToken = refreshToken;
        return this.authenticationService.refreshToken(refTok).pipe(
          switchMap(response => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(response.accessToken);
            return next.handle(this.addTokenHeader(req, response.accessToken));
          }),
          catchError(err => {
            this.isRefreshing = false;
            this.toast.info(`Veuillez vous reconnecter !`, `Votre session a expiré`, this.options);
            setTimeout(async () => {
              // déconnecter automatiquement l'utilisateur
              await this.authenticationService.logout();
              this.router.navigate(['/login'], {queryParams: {returnUrl: location.pathname}}).then();
              location.reload();
            }, 3000);

            return throwError(err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(accessToken => accessToken !== null),
      take(1),
      switchMap(accessToken => next.handle(this.addTokenHeader(req, accessToken)))
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  }
}
