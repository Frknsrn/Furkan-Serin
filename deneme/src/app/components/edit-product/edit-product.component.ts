import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService, StoreItem } from '../../services/shopping.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: StoreItem | null = null;
  categories: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  imagePreview: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.categories = this.shoppingService.getCategories();
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      const existingProduct = this.shoppingService.getStoreItemById(parseInt(id));
      if (existingProduct) {
        this.product = { ...existingProduct };
        this.imagePreview = existingProduct.image;
      } else {
        this.errorMessage = 'Ürün bulunamadı.';
        setTimeout(() => {
          this.router.navigate(['/store']);
        }, 3000);
      }
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && this.product) {
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
        if (this.product) {
          this.product.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.product) return;

    if (!this.product.name || !this.product.category || this.product.price <= 0 || this.product.stock < 0) {
      this.errorMessage = 'Lütfen tüm alanları doldurun ve geçerli değerler girin.';
      return;
    }

    try {
      const result = this.shoppingService.updateStoreItem(this.product);
      if (result) {
        this.successMessage = 'Ürün başarıyla güncellendi!';
        setTimeout(() => {
          this.router.navigate(['/store']);
        }, 3000);
      } else {
        this.errorMessage = 'Ürün güncellenirken bir hata oluştu.';
      }
    } catch (error) {
      this.errorMessage = 'Ürün güncellenirken bir hata oluştu.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/store']);
  }
}
