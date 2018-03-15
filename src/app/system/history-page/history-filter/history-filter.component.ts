import {Component, EventEmitter, Input, Output} from '@angular/core';


import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'na-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Output() onFilterRefresh = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  types = [
    {type: 'income', label: 'доход'},
    {type: 'outcome', label: 'расход'}
    ];

  timePeriods = [
    {type: 'd', label: 'за последний день'},
    {type: 'w', label: 'за последнюю неделю'},
    {type: 'M', label: 'за последний месяц'}
  ];

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

  resetFilter(data) {
    console.log(data.parentElement.parentElement.children);
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : this[field] = [];
    } else {
      this[field].filter(i => i !== value);
    }
  }

  handleChangeType({value, checked}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({value, checked}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      periods: this.selectedPeriod,
      types: this.selectedTypes,
      categories: this.selectedCategories
    });
  }
}
