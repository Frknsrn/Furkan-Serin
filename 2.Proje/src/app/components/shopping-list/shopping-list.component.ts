import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService, ShoppingItem } from '../../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: ShoppingItem[] = [];
  totalBudget: number = 0;
  remainingBudget: number = 0;
  totalSpent: number = 0;
  orderConfirmed: boolean = false;

  constructor(
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.shoppingService.getItems();
    this.totalBudget = this.shoppingService.getTotalBudget();
    this.remainingBudget = this.shoppingService.getRemainingBudget();
    this.totalSpent = this.shoppingService.getTotalSpent();
  }

  editItem(item: ShoppingItem): void {
    this.router.navigate(['/edit', item.id]);
  }

  deleteItem(item: ShoppingItem): void {
    this.shoppingService.deleteItem(item.id);
    this.loadItems();
  }

  getItemTotal(item: ShoppingItem): number {
    return item.price * item.quantity;
  }

  getBudgetStatus(): string {
    const percentage = (this.remainingBudget / this.totalBudget) * 100;
    if (percentage > 50) return 'good';
    if (percentage > 20) return 'warning';
    return 'danger';
  }

  confirmOrder(): void {
    this.shoppingService.confirmOrder();
    this.orderConfirmed = true;
    this.loadItems();

    setTimeout(() => {
      this.orderConfirmed = false;
    }, 3000);
  }
}
