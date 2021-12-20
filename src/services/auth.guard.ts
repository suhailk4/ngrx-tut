import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../app/store/app.state";
import {isAuthenticated} from "../app/auth/state/auth.selector";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})

export class AuthGuard implements  CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return  this.store.select(isAuthenticated).pipe(
    map((auth) => {
      if (!auth) {
        this.router.navigate(['/auth'])
        return false;
      }
      return true;
    })
  )

 }
}
