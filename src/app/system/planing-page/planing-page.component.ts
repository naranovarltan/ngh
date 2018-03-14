import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {Subscription} from 'rxjs/Subscription';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {NAEvent} from '../shared/models/event.model';

@Component({
  selector: 'na-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.css']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded = false;
  bill: Bill;
  categories: Category [] = [];
  events: NAEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], NAEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getCategoryCost(category: Category): number {
    const catEvents = this.events.filter(e => e.category === category.id && e.type ==='outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = (this.getCategoryCost(category) * 100) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCatColorClass(category: Category) {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
