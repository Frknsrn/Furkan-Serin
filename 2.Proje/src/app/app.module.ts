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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { CustomerBudgetsComponent } from './components/customer-budgets/customer-budgets.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

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
    AddCategoryComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    HomeComponent,
    EarningsComponent,
    CustomerBudgetsComponent,
    AdminOrdersComponent
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
