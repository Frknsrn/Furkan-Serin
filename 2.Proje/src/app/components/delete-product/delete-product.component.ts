import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService, StoreItem } from '../../services/shopping.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  products: StoreItem[] = [];
  storeItems: StoreItem[] = [];
  selectedProductId: number | null = null;
  selectedProduct: StoreItem | null = null;
  errorMessage = '';
  successMessage = '';
  categories: string[] = [];
  imagePreview: string | null = null;

  constructor(
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.products = this.shoppingService.getStoreItems();
    this.storeItems = this.products;
    this.categories = this.shoppingService.getCategories();
  }

  onProductSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedId = parseInt(select.value);
    if (isNaN(selectedId)) {
      this.selectedProduct = null;
      this.imagePreview = null;
      return;
    }
    this.onProductSelectById(selectedId);
  }

  onProductSelectById(id: number): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.selectedProduct = { ...product };
      this.imagePreview = product.image;
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && this.selectedProduct) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Dosya boyutu 5MB\'dan küçük olmalıdır.';
        return;
      }

      // Dosya tipini kontrol et
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Lütfen geçerli bir resim dosyası seçin.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        if (this.selectedProduct) {
          this.selectedProduct.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.selectedProduct) {
      this.errorMessage = 'Lütfen bir ürün seçin';
      return;
    }

    if (!this.selectedProduct.name || !this.selectedProduct.category || 
        this.selectedProduct.price <= 0 || this.selectedProduct.stock < 0) {
      this.errorMessage = 'Lütfen tüm alanları doldurun ve geçerli değerler girin.';
      return;
    }

    try {
      const result = this.shoppingService.updateStoreItem(this.selectedProduct);
      if (result) {
        this.successMessage = 'Ürün başarıyla güncellendi!';
        setTimeout(() => {
          this.router.navigate(['/store']);
        }, 2000);
      } else {
        this.errorMessage = 'Ürün güncellenirken bir hata oluştu.';
      }
    } catch (error) {
      this.errorMessage = 'Ürün güncellenirken bir hata oluştu.';
    }
  }

  onDelete(): void {
    if (!this.selectedProduct) {
      this.errorMessage = 'Lütfen bir ürün seçin';
      return;
    }

    try {
      const result = this.shoppingService.deleteStoreItem(this.selectedProduct.id);
      if (result) {
        this.successMessage = 'Ürün başarıyla silindi!';
        setTimeout(() => {
          this.router.navigate(['/store']);
        }, 2000);
      } else {
        this.errorMessage = 'Ürün silinirken bir hata oluştu.';
      }
    } catch (error) {
      this.errorMessage = 'Ürün silinirken bir hata oluştu.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/store']);
  }
}
