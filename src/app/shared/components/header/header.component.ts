import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AppState} from "../../../store/app.state";
import {Store} from "@ngrx/store";
import {isAuthenticated} from "../../../auth/state/auth.selector";
import {autoLogout} from "../../../auth/state/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  isAuthenticated$: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onLogout(): void {
    this.store.dispatch(autoLogout());
  }
}
