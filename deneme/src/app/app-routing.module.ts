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

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: StoreComponent },
  { path: 'list', component: ShoppingListComponent },
  { path: 'add', component: ItemFormComponent },
  { path: 'edit/:id', component: ItemFormComponent },
  { path: 'budget', component: BudgetFormComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'add-category', component: AddCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 