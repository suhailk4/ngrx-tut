import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaust, exhaustMap, Observable, of, take} from "rxjs";
import {AppState} from "../app/store/app.state";
import {getToken} from "../app/auth/state/auth.selector";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
@Injectable()

export class AuthTokenInterceptor implements  HttpInterceptor {
  constructor(private  store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        console.log('Token ', token);
       let modifiedReq =  req.clone({
          params: req.params.append('auth', token)
        });
        return next.handle(modifiedReq);
      })
   )
  }

}
