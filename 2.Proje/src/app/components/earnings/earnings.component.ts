import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent {
  totalEarnings: number = 0;
  monthlyEarnings: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Sadece admin erişebilir
    if (!authService.isAdmin()) {
      this.router.navigate(['/login']);
    }
  }

  // Burada kazanç hesaplama metodları eklenecek
} 