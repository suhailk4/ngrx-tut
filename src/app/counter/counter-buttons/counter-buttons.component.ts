import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from 'src/app/counter/counter/state/counter.actions';
import { AppState } from 'src/app/store/app.state';
import { Counterstate } from '../counter/state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent implements OnInit {


  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
  }

  onIncrement(): void {
    // this.increment.emit();
    this.store.dispatch(increment());
  }

  onDecrement(): void {
    // this.decrement.emit();
    this.store.dispatch(decrement());
  }

  onReset(): void {
    // this.reset.emit();
    this.store.dispatch(reset());
  }

}
