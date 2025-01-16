import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  currentBudget: number = 0;
  newBudget: number = 0;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this.currentBudget = this.shoppingService.getTotalBudget();
    this.newBudget = 0;
  }

  onSubmit(): void {
    if (this.newBudget <= 0) {
      this.errorMessage = 'Bütçe 0\'dan büyük olmalıdır.';
      return;
    }

    if (this.shoppingService.updateBudget(this.newBudget)) {
      this.router.navigate(['/list']);
    } else {
      this.errorMessage = 'Yeni bütçe mevcut harcamalardan az olamaz!';
    }
  }

  onCancel(): void {
    this.router.navigate(['/list']);
  }
}
