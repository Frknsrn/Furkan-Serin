import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    // Form validasyonu
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Lütfen tüm alanları doldurun.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Şifreler eşleşmiyor.';
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Geçerli bir email adresi girin.';
      return;
    }

    const success = this.authService.register(this.name, this.email, this.password);
    
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Bu email adresi zaten kullanımda.';
    }
  }
} 