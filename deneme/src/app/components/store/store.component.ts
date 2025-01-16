import { Component, OnInit } from '@angular/core';
import { ShoppingService, StoreItem } from '../../services/shopping.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  storeItems: StoreItem[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private shoppingService: ShoppingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStoreItems();
    this.categories = this.shoppingService.getCategories();
  }

  loadStoreItems(): void {
    if (this.selectedCategory) {
      this.storeItems = this.shoppingService.getStoreItemsByCategory(this.selectedCategory);
    } else {
      this.storeItems = this.shoppingService.getStoreItems();
    }
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.loadStoreItems();
  }

  addToCart(item: StoreItem): void {
    const result = this.shoppingService.addToCart(item);
    if (result) {
      this.router.navigate(['/list']);
    }
  }
}
