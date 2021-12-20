import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { changeChannelName, customIncrement } from '../counter/state/counter.actions';
import { getChannelName, getCounter } from '../counter/state/counter.selector';
import { Counterstate } from '../counter/state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {

  value: number = 0;
  channelName$: Observable<string> = of('');
  constructor(private store: Store<{counter: Counterstate}>) { }
  

  ngOnInit(): void {
    // this.store.select('counter').subscribe(data => {
    //   console.log('channel Called');

    //   this.channelName = data.channelName;
    // });
    this.channelName$ = this.store.select(getChannelName);

  }

  onSubmitValue(): void {
    this.store.dispatch(customIncrement({value: this.value}));
  }

  onChangeChannelName(): void {
    this.store.dispatch(changeChannelName());
  }

}
