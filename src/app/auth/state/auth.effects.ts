import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {autoLogin, autoLogout, loginStart, loginSuccess, signUpStart, signupSuccess} from "./auth.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../models/user.model";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpinner} from "../../shared/shared.actions";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Injectable()

export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user: User = this.authService.formatData(data);
            this.store.dispatch(setErrorMessage({message: ''}));
            this.store.dispatch(setLoadingSpinner({status: false}));
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({user, redirect: true});
          }),
          catchError((err) => {
            console.log(err);
            this.store.dispatch(setLoadingSpinner({status: false}));
            const errorMessage = this.authService.getErrorMessage(err.error.error.message);
            this.store.dispatch(setErrorMessage({message: errorMessage}));
            return of(setErrorMessage({message: errorMessage}));
          })
        )
      })
    )
  });


  loginRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({message: ''}))
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      )
    }, {dispatch: false}
  );

  signupRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(signupSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({message: ''}))
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      )
    }, {dispatch: false}
  );


  signUp$ = createEffect(() => {
    return this.actions$.pipe(ofType(signUpStart),
      mergeMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const user = this.authService.formatData(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({user, redirect: true})
          }),
          catchError((err) => {
            console.log(err);
            this.store.dispatch(setLoadingSpinner({status: false}));
            const errorMessage = this.authService.getErrorMessage(err.error.error.message);
            this.store.dispatch(setErrorMessage({message: errorMessage}));
            return of(setErrorMessage({message: errorMessage}));
          })
        )
      })
    )
  });

  autoLogin$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(autoLogin),
        mergeMap((action) => {
          const user = this.authService.getUserFromLocalStorage();
          console.log(user);
          return of(loginSuccess({user, redirect: false}))
        }))
    }
  );

  autoLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      map(() => {
        this.authService.logout();
      })
    )
  }, {dispatch: false})
}
