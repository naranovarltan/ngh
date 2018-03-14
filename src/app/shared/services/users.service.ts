import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable()

export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }
  /* getUserByEmail(email: string) {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .map((user: User[]) => user[0] ? user[0] : undefined);
  } */
  getUserByEmail(email: string) {
    return this.get(`users?=${email}`)
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }
  createNewUser(user: User) {
    return this.post('users', user);
  }

}
