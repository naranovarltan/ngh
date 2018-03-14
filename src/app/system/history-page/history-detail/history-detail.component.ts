import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {NAEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'na-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  sub1: Subscription;
  isLoaded = false;

  event: NAEvent;
  category: Category;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoryService: CategoriesService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .mergeMap((params: Params) =>
      this.eventsService.getEventById(params['id']))
      .mergeMap((event: NAEvent) => {
      this.event = event;
      return this.categoryService.getCategoryById(event.category);
      })
      .subscribe( (category: Category) => {
      this.category = category;
      this.isLoaded = true;
      });
  }

}
