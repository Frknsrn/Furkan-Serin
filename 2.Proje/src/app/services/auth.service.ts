import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private currentUser: User | null = null;

  constructor(private router: Router) {
    this.initializeUsers();
  }

  private initializeUsers() {
    const users: User[] = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin12',
        isAdmin: true,
        balance: 1000
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUser(user: User) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(name: string, email: string, password: string): boolean {
    const users = this.getUsers();
    
    // Email kontrolü
    if (users.some(user => user.email === email)) {
      return false;
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
      balance: 1000,
      isAdmin: false
    };

    this.saveUser(newUser);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      // Kullanıcı rolüne göre yönlendirme
      if (user.isAdmin) {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/user-dashboard']);
      }
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getAllUsers(): User[] {
    return this.getUsers();
  }

  isAdmin(): boolean {
    return this.currentUser?.isAdmin || false;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  updateBalance(userId: number, newBalance: number) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].balance = newBalance;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      if (this.currentUser?.id === userId) {
        this.currentUser.balance = newBalance;
      }
    }
  }
} 