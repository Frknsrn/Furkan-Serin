import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { StoreComponent } from './components/store/store.component';
import { QuantityDialogComponent } from './components/quantity-dialog/quantity-dialog.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ItemFormComponent,
    BudgetFormComponent,
    StoreComponent,
    QuantityDialogComponent,
    ProductFormComponent,
    DeleteProductComponent,
    EditProductComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
