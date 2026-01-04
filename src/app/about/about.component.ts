// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthGuard } from '../gaurd/auth.gaurd';

// @Component({
//   selector: 'app-about',
//   imports: [FormsModule,
//     CommonModule

//   ],
//   templateUrl: './about.component.html',
//   styleUrl: './about.component.scss'
// })
// export class AboutComponent {
//   username: string = '';
//   password: string = '';
//   showPassword: boolean = false;

//   constructor(private router: Router, private authGuard: AuthGuard) { }

//   onLogin() {
//     console.log('Username:', this.username);
//     console.log('Password:', this.password);
//     if (this.username === 'a' && this.password === 'a') {
//       this.authGuard.login(); // Set login state
//       this.router.navigate(['/customers'], { replaceUrl: true });
//     } else {
//       alert('Invalid username or password');
//     }
//   }

//   onLogout() {
//     this.router.navigate(['/']);
//   }

//   togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }
// }
