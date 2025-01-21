import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  currentUser: User | null = null;
  amount: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (!this.currentUser) {
      this.errorMessage = 'Oturum açmanız gerekiyor.';
      return;
    }

    if (this.amount <= 0) {
      this.errorMessage = 'Eklenecek miktar 0\'dan büyük olmalıdır.';
      return;
    }

    const newBalance = (this.currentUser.balance || 0) + this.amount;
    this.authService.updateBalance(this.currentUser.id, newBalance);
    this.currentUser = this.authService.getCurrentUser();
    this.successMessage = `${this.amount} TL bakiyenize eklendi.`;
    this.errorMessage = '';
    this.amount = 0; // Formu sıfırla
  }

  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
