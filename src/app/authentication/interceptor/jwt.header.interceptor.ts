import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class JwtHeaderInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ajouter Authorization à l'entete de la requete is l'utilisateur est connecté
    const currentUser = this.authenticationService.currentUserValue();
    const isLoggedIn = currentUser && currentUser.token;

    if (isLoggedIn && !req.url.includes('authenticate')) {
      req = this.addTokenHeader(req, currentUser.token);
    }

    return next.handle(req);
  }

  addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

}
