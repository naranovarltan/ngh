import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';


import {Category} from '../shared/models/category.model';
import {NAEvent} from '../shared/models/event.model';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'na-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;

  categories: Category[] = [];
  events: NAEvent[] = [];

  chartData = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], NAEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter((e) =>
      e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
