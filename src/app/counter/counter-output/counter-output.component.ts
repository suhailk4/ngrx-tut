import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../counter/state/counter.selector';
import { Counterstate } from '../counter/state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter: number = 0;
  // counter: number = 0;

  counter$: Observable<number> = of(0);


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('counter').subscribe(counter => {
    //   console.log('Counter Called');
    //   this.counter = counter.counter;
    // });
    this.counter$ = this.store.select(getCounter);
  }

}
