import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StoreItem } from '../../services/shopping.service';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.css']
})
export class QuantityDialogComponent {
  @Input() item: StoreItem | null = null;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<number>();

  quantity: number = 1;

  onConfirm(): void {
    this.confirm.emit(this.quantity);
    this.close.emit();
    this.quantity = 1;
  }

  onCancel(): void {
    this.close.emit();
    this.quantity = 1;
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
