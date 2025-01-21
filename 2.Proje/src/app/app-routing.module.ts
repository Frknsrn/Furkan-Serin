import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { StoreComponent } from './components/store/store.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { CustomerBudgetsComponent } from './components/customer-budgets/customer-budgets.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'store', component: StoreComponent },
  { path: 'list', component: ShoppingListComponent },
  { path: 'add', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  { path: 'budget', component: BudgetFormComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'earnings', component: EarningsComponent },
  { path: 'customer-budgets', component: CustomerBudgetsComponent },
  { 
    path: 'admin-orders', 
    component: AdminOrdersComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 