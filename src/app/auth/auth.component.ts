import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {fadeStateTrigget} from '../shared/amination/fade.animation';

@Component({
  selector: 'na-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigget]
})

export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}


