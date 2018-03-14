import {Component, Input} from '@angular/core';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'na-history-chard',
  templateUrl: './history-chard.component.html',
  styleUrls: ['./history-chard.component.css']
})
export class HistoryChardComponent {
  @Input() data;
}
