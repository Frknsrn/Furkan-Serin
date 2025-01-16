import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  newCategory: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  categories: string[] = [];

  constructor(
    private router: Router,
    private shoppingService: ShoppingService
  ) {
    this.categories = this.shoppingService.getCategories();
  }

  onSubmit(): void {
    if (!this.newCategory.trim()) {
      this.errorMessage = 'Lütfen bir kategori adı girin.';
      return;
    }

    if (this.categories.includes(this.newCategory.trim())) {
      this.errorMessage = 'Bu kategori zaten mevcut.';
      return;
    }

    try {
      const result = this.shoppingService.addCategory(this.newCategory.trim());
      if (result) {
        this.successMessage = 'Kategori başarıyla eklendi!';
        this.categories = this.shoppingService.getCategories();
        this.newCategory = '';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } else {
        this.errorMessage = 'Kategori eklenirken bir hata oluştu.';
      }
    } catch (error) {
      this.errorMessage = 'Kategori eklenirken bir hata oluştu.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/store']);
  }
}
