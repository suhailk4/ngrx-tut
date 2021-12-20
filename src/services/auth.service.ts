import {Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthresponseModel} from "../app/models/authresponse.model";
import {Observable} from "rxjs";
import {User} from "../app/models/user.model";
import {AppState} from "../app/store/app.state";
import {Store} from "@ngrx/store";
import {autoLogout} from "../app/auth/state/auth.actions";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient, private store: Store<AppState>) {}

    timeoutInterval: any;

    login(email: string, password: string): Observable<AuthresponseModel> {
      return this.http.post<AuthresponseModel>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
        {email, password, returnSecureToken: true}
      );
    }

    signUp(email: string, password: string): Observable<AuthresponseModel> {
      return  this.http.post<AuthresponseModel>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
        {
        email,
        password,
        returnSecureToken: true
      });
    }

    formatData(data: AuthresponseModel) {
      const expirationDate = new Date (new Date().getTime() + +data.expiresIn * 1000);
      const user = new User(data.email, data.idToken, data.localId, expirationDate);
      return user;
    }

    getUserFromLocalStorage(): User | null {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const expirationDate = new Date(userData.expirationDate);
        const user = new User(userData.email, userData.token, userData.localId, expirationDate);
        return user;
      }
      return null;
    }

    setUserInLocalStorage(user: User): void {
       localStorage.setItem('userData', JSON.stringify(user));
       this.runTimeOutInterval(user);
    }

    private runTimeOutInterval(user: User) {
      const todaysDate  = new Date().getTime();
      const expirationDate = user.getExpriationDate().getTime();
      const timeInterval = expirationDate - todaysDate;
      this.timeoutInterval = setTimeout(() => {
        // Logout
        this.store.dispatch(autoLogout());
      }, timeInterval);
    }

    getErrorMessage(errResponse: string) {
      switch (errResponse) {
        case 'EMAIL_NOT_FOUND':
          return 'Email Not Found';
        case 'INVALID_PASSWORD':
          return 'Invalid Password';
        case 'EMAIL_EXISTS':
          return  'Email already exists'
        default:
          return 'Unknown Error occurred, please try again in sometime'
      }
    }

    logout(): void {
      localStorage.removeItem('userData');
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null
    }
}
