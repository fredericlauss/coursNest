// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe();
  }
}
