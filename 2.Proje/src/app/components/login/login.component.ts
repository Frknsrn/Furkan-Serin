import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Eğer zaten giriş yapılmışsa, kullanıcı rolüne göre yönlendir
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (currentUser.isAdmin) {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/user-dashboard']);
      }
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Lütfen tüm alanları doldurun.';
      return;
    }

    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.errorMessage = 'Geçersiz email veya şifre.';
    }
  }
} 