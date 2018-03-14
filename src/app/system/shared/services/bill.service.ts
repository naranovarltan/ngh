import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BaseApi} from '../../../shared/core/base-api';
import {Bill} from '../models/bill.model';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  /* getBill() {
    return this.http.get('http://localhost:3000/bill');
  } */

  getBill() {
    return this.get('bill');
  }

  getCurrency(base: string = 'RUB') {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`);
  }

  updateBill(bill: Bill) {
    return this.put('bill', bill);
  }
}
