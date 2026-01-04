import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router
  ) { }
  onLogin() {
    if (this.username === 'a' && this.password === 'a') {
      // this.router.navigate(['/footer'], { replaceUrl: true });
      this.router.navigate(['/customers'], { replaceUrl: true });
    } else {
      alert('Invalid username or password');
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
