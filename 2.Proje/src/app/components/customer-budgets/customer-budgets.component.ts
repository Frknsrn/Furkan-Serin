import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-customer-budgets',
  templateUrl: './customer-budgets.component.html',
  styleUrls: ['./customer-budgets.component.css']
})
export class CustomerBudgetsComponent implements OnInit {
  customers: User[] = [];
  currentUser: User | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser?.isAdmin) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadCustomers();
  }

  private loadCustomers() {
    // Admin dışındaki tüm kullanıcıları al
    this.customers = this.authService.getAllUsers().filter(user => !user.isAdmin);
  }

  updateCustomerBalance(customerId: number, newBalance: number) {
    if (newBalance < 0) {
      this.errorMessage = 'Bakiye 0\'dan küçük olamaz.';
      return;
    }

    this.authService.updateBalance(customerId, newBalance);
    this.loadCustomers(); // Listeyi güncelle
    this.errorMessage = '';
  }
} 