import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'na-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
