import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {AUTH_STATE_NAME} from "./state/auth.selector";
import {authReducer} from "./state/auth.reducer";
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from "./login/login.component";


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule
  ]
})
export class AuthModule { }
