import {Component, Input } from '@angular/core';

@Component({
  selector: 'na-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent {

  @Input() currency: any;

  currenecies: string[] = ['USD', 'EUR'];

}
