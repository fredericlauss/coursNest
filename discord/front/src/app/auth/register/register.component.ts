// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onRegister(): void {
    this.authService.register({ username: this.username, email: this.email, password: this.password })
      .subscribe(() => {
        // Optionally redirect to login page after registration
      });
  }
}
