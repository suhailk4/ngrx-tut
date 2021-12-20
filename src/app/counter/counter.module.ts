import {NgModule} from "@angular/core";
import {CounterComponent} from "./counter/counter.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {CustomCounterInputComponent} from "./custom-counter-input/custom-counter-input.component";
import {CounterButtonsComponent} from "./counter-buttons/counter-buttons.component";
import {CounterOutputComponent} from "./counter-output/counter-output.component";
import {FormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { COUNTER_STATE_NAME } from "./counter/state/counter.selector";
import { counterReducer } from "./counter/state/counter.reducer";

const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  }
];
@NgModule({
  declarations: [
    CounterComponent,
    CustomCounterInputComponent,
    CounterButtonsComponent,
    CounterOutputComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ]
})

export class CounterModule {

}
