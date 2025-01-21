import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../../services/shopping.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categories: string[] = [];
  newCategoryName: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private shoppingService: ShoppingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Admin kontrolü
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCategories();
  }

  private loadCategories() {
    this.categories = this.shoppingService.getCategories();
  }

  addCategory() {
    if (!this.newCategoryName.trim()) {
      this.errorMessage = 'Kategori adı boş olamaz.';
      return;
    }

    if (this.categories.includes(this.newCategoryName.trim())) {
      this.errorMessage = 'Bu kategori zaten mevcut.';
      return;
    }

    this.shoppingService.addCategory(this.newCategoryName.trim());
    this.loadCategories();
    this.successMessage = 'Kategori başarıyla eklendi.';
    this.errorMessage = '';
    this.newCategoryName = ''; // Formu temizle
  }

  deleteCategory(category: string) {
    if (confirm(`"${category}" kategorisini silmek istediğinize emin misiniz?`)) {
      this.shoppingService.deleteCategory(category);
      this.loadCategories();
      this.successMessage = 'Kategori başarıyla silindi.';
      this.errorMessage = '';
    }
  }
}
