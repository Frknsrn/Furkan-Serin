import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {
    name: '',
    category: '',
    price: 0,
    description: '',
    image: '',
    stock: 0
  };

  categories: string[] = [];
  imagePreview: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private shoppingService: ShoppingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.shoppingService.getCategories();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.product.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.product.image) {
      this.errorMessage = 'Lütfen bir ürün görseli seçin';
      return;
    }

    try {
      this.shoppingService.addStoreItem({
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        description: this.product.description,
        image: this.product.image,
        stock: this.product.stock
      });

      this.successMessage = 'Ürün başarıyla eklendi!';
      setTimeout(() => {
        this.router.navigate(['/store']);
      }, 1500);
    } catch (error) {
      this.errorMessage = 'Ürün eklenirken bir hata oluştu';
    }
  }
}
