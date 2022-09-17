import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/user.model';
import {environment} from '../../../environments/environment';
import {RefreshTokenRequest} from '../model/refresh-token-request';
import {RefreshTokenResponse} from '../model/refresh-token-response';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {SimpleObjectResponse} from '../../shared/model/simple-object-response';
import {UserAuthenticateModel} from '../model/user-authenticate-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOGGED_USER_KEY = 'SCISK_LOGGED_USER';

  private jwtHelperService: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.jwtHelperService = new JwtHelperService();
  }

  currentUserValue(): UserModel {
    return JSON.parse(localStorage.getItem(this.LOGGED_USER_KEY)) as UserModel;
  }

  login(username: string, password: string) {
    const userAuthenticateModel = new UserAuthenticateModel();
    userAuthenticateModel.email = username;
    userAuthenticateModel.password = password;
    return this.httpClient.post<any>(`${environment.BASE_API_URL}/user/authenticate`, userAuthenticateModel, {observe: 'response'})
      .pipe(map(response => {
        const token = response.body.item.accessToken ?? '';
        const refreshToken = response.body.item.refreshToken ?? '';
        const decodedToken = this.jwtHelperService.decodeToken(token);

        const userModel = new UserModel();
        userModel.token = token;
        userModel.refreshToken = refreshToken;
        userModel.authorities = decodedToken.authorities;
        userModel.firstname = decodedToken.firstname;
        userModel.lastname = decodedToken.lastname;
        userModel.email = decodedToken.email;

        // stocker les informations de l'utilisateur connecté
        localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(userModel));
        return userModel;
      }));
  }

  async logout(): Promise<any> {
    const {username} = this.currentUserValue();
    return this.httpClient.post(`${environment.BASE_API_URL}/user/logout`, {username})
      .pipe(
        tap(() => localStorage.removeItem(this.LOGGED_USER_KEY))
      ).toPromise();
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    const url = `${environment.BASE_API_URL}/user/refresh-token`;
    return this.httpClient.post<SimpleObjectResponse<RefreshTokenResponse>>(url, refreshTokenRequest)
      .pipe(
        map(response => response.item),
        tap(({accessToken, refreshToken}) => {
          const userModel = this.currentUserValue();
          if (userModel) {
            const newUserModel = {...userModel, accessToken, refreshToken};
            localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(newUserModel));
          }
        })
      );
  }
}
