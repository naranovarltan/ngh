import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigget} from '../../shared/amination/fade.animation';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'na-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeStateTrigget]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message = new Message('danger', '');

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин, вход, система'},
      {name: 'description', content: 'Страница для входа'}
    ]);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
          if (params['nowCanLogin']) {
            this.showMessage({
              text: 'Теперь вы можете войти',
              type: 'danger'
            });
          } else if (params['accessDenied']) {
            this.showMessage({
              text: 'Для работы с системой необходимо авторизоваться',
              type: 'warning'
            });
          }
        }
      );

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(massage: Message) {
    this.message = massage;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Пароль не верный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Пользователь не существует',
            type: 'danger'
          });
        }
      }
    );
  }
}
