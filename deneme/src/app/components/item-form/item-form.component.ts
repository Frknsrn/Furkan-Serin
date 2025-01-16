import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService, ShoppingItem, StoreItem } from '../../services/shopping.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  item: ShoppingItem = {
    id: 0,
    name: '',
    quantity: 1,
    price: 0
  };
  storeItems: StoreItem[] = [];
  selectedStoreItem: StoreItem | null = null;
  isEditMode = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.storeItems = this.shoppingService.getStoreItems();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      const existingItem = this.shoppingService.getItem(parseInt(id));
      if (existingItem) {
        this.item = { ...existingItem };
      }
    }
  }

  onStoreItemSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const storeItemId = +select.value;
    const storeItem = this.storeItems.find(item => item.id === storeItemId);
    if (storeItem) {
      this.selectedStoreItem = storeItem;
      this.item.name = storeItem.name;
      this.item.price = storeItem.price;
    }
  }

  onSubmit(): void {
    let result: ShoppingItem | null;
    
    if (this.isEditMode) {
      result = this.shoppingService.updateItem(this.item.id, this.item);
    } else {
      if (!this.selectedStoreItem) {
        this.errorMessage = 'Lütfen bir ürün seçin!';
        return;
      }
      result = this.shoppingService.addToCart(this.selectedStoreItem, this.item.quantity);
    }

    if (result) {
      this.router.navigate(['/list']);
    } else {
      this.errorMessage = 'Bütçe yetersiz! İşlem gerçekleştirilemedi.';
    }
  }

  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
