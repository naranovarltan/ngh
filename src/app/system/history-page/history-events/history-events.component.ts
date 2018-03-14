import {Component, Input, OnInit} from '@angular/core';

import {Category} from '../../shared/models/category.model';
import {NAEvent} from '../../shared/models/event.model';

@Component({
  selector: 'na-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: NAEvent[] = [];

  searchValue = '';
  searchPlaceHolder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventsClass(e: NAEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceHolder = namesMap[field];
    this.searchField = field;
  }

}
