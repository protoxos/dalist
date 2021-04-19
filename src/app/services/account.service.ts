import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, ResponseStatus } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  LoggedIn = false;
  UserInfo: User = new User();

  private headers = new HttpHeaders();
  private apiurl = 'api/';

  private stepIncrementalTimeOut = 3000;
  private originalTimeOut = 5000;
  private maxTimeout = 60000;
  private timeOut = 5000;

  constructor(private http: HttpClient) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.checkLogin();
  }

  Login(Username: string, Password: string): void {
    const data = {
      action: 'login',
      Username,
      Password
    };

    this.http.post<ApiResponse>(this.apiurl, data, { headers: this.headers, withCredentials: true })
    // tslint:disable-next-line: deprecation
    .subscribe(
      (res) => {
        if (res.State === ResponseStatus.Success) {
          this.UserInfo = res.Data;
          this.LoggedIn = true;
        }

        else {
          this.UserInfo = new User();
          this.LoggedIn = false;
        }
      }
    );

  }

  private checkLogin(): void {

    const data = {
      action: 'get_logged_user'
    };

    this.http.post<ApiResponse>(this.apiurl, data, { headers: this.headers, withCredentials: true })
    // tslint:disable-next-line: deprecation
    .subscribe(
      (res) => {
        if (res.State === ResponseStatus.Success) {
          this.UserInfo = res.Data as User;
          this.LoggedIn = true;
        }

        else {
          this.UserInfo = new User();
          this.LoggedIn = false;
        }

        this.timeOut = this.originalTimeOut;
        setTimeout(() => { this.checkLogin(); }, this.timeOut);
      },

      () => {
        this.timeOut += this.stepIncrementalTimeOut;
        this.timeOut = this.timeOut < this.maxTimeout ? this.timeOut : this.maxTimeout;
        setTimeout(() => { this.checkLogin(); }, this.timeOut);
      }

    );

  }
}
