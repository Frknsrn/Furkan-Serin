import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;

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

    // Tüm kullanıcıları al
    this.loadUsers();
  }

  private loadUsers() {
    // AuthService'den tüm kullanıcıları al
    // Bu metod daha sonra eklenecek
  }

  onLogout() {
    this.authService.logout();
  }
} 