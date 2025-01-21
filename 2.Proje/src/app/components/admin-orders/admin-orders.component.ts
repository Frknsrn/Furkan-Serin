import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Order {
  id: number;
  userId: number;
  userName: string;
  products: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  orderDate: Date;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  activeTab: 'pending' | 'approved' | 'rejected' = 'pending';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.isAdmin) {
      this.router.navigate(['/login']);
      return;
    }

    // Örnek veriler (gerçek uygulamada bir service'den gelecek)
    this.orders = [
      {
        id: 1,
        userId: 2,
        userName: "Ahmet Yılmaz",
        products: [
          { id: 1, name: "Ürün 1", quantity: 2, price: 100 },
          { id: 2, name: "Ürün 2", quantity: 1, price: 150 }
        ],
        totalAmount: 350,
        status: 'pending',
        orderDate: new Date()
      }
    ];
  }

  approveOrder(orderId: number) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'approved';
    }
  }

  rejectOrder(orderId: number) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'rejected';
    }
  }

  getFilteredOrders() {
    return this.orders.filter(order => order.status === this.activeTab);
  }
} 