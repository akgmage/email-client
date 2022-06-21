import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
interface UsernameAvailableResponse {
  available: boolean;
}
interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SignupResponse {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }
  
  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username: username
  });
  }
  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.rootUrl}/auth/signup`,
      credentials, {
        withCredentials: true
      }
    ).pipe(
        tap(() => {
          this.signedin$.next(true);
        })
    );
  }
// By default the HttpClient is going to ignore the cookies unless we add in options object of withCredentials: true
  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`, {
      withCredentials: true
    })
      .pipe(
        tap(response => {
          console.log(response);
        })
      );
  }

}
