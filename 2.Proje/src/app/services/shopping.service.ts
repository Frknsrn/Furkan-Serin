import { Injectable } from '@angular/core';

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface StoreItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private items: ShoppingItem[] = [];
  private storeItems: StoreItem[] = [];
  private categories: string[] = [];
  private totalBudget: number = 1000;
  private remainingBudget: number;
  private readonly CATEGORIES_KEY = 'categories';

  constructor() {
    // LocalStorage'dan verileri yükle
    this.loadFromLocalStorage();
    
    // Eğer veriler boşsa, varsayılan verileri yükle
    if (this.storeItems.length === 0) {
      this.initializeDefaultData();
    }

    this.remainingBudget = this.totalBudget - this.getTotalSpent();
  }

  private loadFromLocalStorage(): void {
    const storedItems = localStorage.getItem('shoppingItems');
    const storedStoreItems = localStorage.getItem('storeItems');
    const storedCategories = localStorage.getItem(this.CATEGORIES_KEY);
    const storedBudget = localStorage.getItem('totalBudget');

    if (storedItems) this.items = JSON.parse(storedItems);
    if (storedStoreItems) this.storeItems = JSON.parse(storedStoreItems);
    if (storedCategories) this.categories = JSON.parse(storedCategories);
    if (storedBudget) this.totalBudget = JSON.parse(storedBudget);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('shoppingItems', JSON.stringify(this.items));
    localStorage.setItem('storeItems', JSON.stringify(this.storeItems));
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(this.categories));
    localStorage.setItem('totalBudget', JSON.stringify(this.totalBudget));
  }

  private initializeDefaultData(): void {
    this.categories = [
      'Gıda',
      'Elektronik',
      'Ev Eşyaları',
      'Mobilya',
      'Giyim',
      'Kitap & Hobi'
    ];

    this.storeItems = [
      // Gıda Kategorisi
      {
        id: 1,
        name: 'Ekmek',
        price: 7.5,
        description: 'Taze günlük ekmek',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500',
        category: 'Gıda',
        stock: 100
      },
      {
        id: 2,
        name: 'Süt',
        price: 22.5,
        description: 'Günlük taze süt (1 Lt)',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500',
        category: 'Gıda',
        stock: 50
      },
      {
        id: 3,
        name: 'Yumurta',
        price: 3.5,
        description: 'Organik köy yumurtası',
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500',
        category: 'Gıda',
        stock: 200
      },
      {
        id: 4,
        name: 'Peynir',
        price: 150.0,
        description: 'Tam yağlı beyaz peynir (500g)',
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500',
        category: 'Gıda',
        stock: 30
      },
      // Elektronik Kategorisi
      {
        id: 5,
        name: 'Akıllı Telefon',
        price: 15000.0,
        description: '128GB, 6.1 inch ekran, 48MP kamera',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        category: 'Elektronik',
        stock: 15
      },
      {
        id: 6,
        name: 'Laptop',
        price: 25000.0,
        description: '16GB RAM, 512GB SSD, 15.6 inch ekran',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        category: 'Elektronik',
        stock: 10
      },
      {
        id: 7,
        name: 'Tablet',
        price: 8000.0,
        description: '64GB, 10.2 inch ekran, WiFi',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        category: 'Elektronik',
        stock: 20
      },
      // Ev Eşyaları Kategorisi
      {
        id: 8,
        name: 'Çamaşır Makinesi',
        price: 12000.0,
        description: '9KG, A+++ enerji sınıfı',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500',
        category: 'Ev Eşyaları',
        stock: 8
      },
      {
        id: 9,
        name: 'Buzdolabı',
        price: 18000.0,
        description: 'No-Frost, 550Lt',
        image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500',
        category: 'Ev Eşyaları',
        stock: 5
      },
      {
        id: 10,
        name: 'Mikrodalga Fırın',
        price: 4500.0,
        description: '23Lt, Dijital kontrol',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500',
        category: 'Ev Eşyaları',
        stock: 12
      },
      // Mobilya Kategorisi
      {
        id: 11,
        name: 'Koltuk Takımı',
        price: 35000.0,
        description: '3+3+1, Kadife kumaş',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
        category: 'Mobilya',
        stock: 3
      },
      {
        id: 12,
        name: 'Yemek Masası',
        price: 8000.0,
        description: '6 Kişilik, Ahşap',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500',
        category: 'Mobilya',
        stock: 6
      },
      {
        id: 13,
        name: 'Gardırop',
        price: 12000.0,
        description: '4 Kapılı, Sürgülü',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
        category: 'Mobilya',
        stock: 4
      },
      // Giyim Kategorisi
      {
        id: 14,
        name: 'Kot Pantolon',
        price: 450.0,
        description: 'Slim fit, Mavi',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        category: 'Giyim',
        stock: 45
      },
      {
        id: 15,
        name: 'Gömlek',
        price: 350.0,
        description: 'Pamuklu, Kareli',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        category: 'Giyim',
        stock: 35
      },
      {
        id: 16,
        name: 'Spor Ayakkabı',
        price: 1200.0,
        description: 'Günlük kullanım, Rahat',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category: 'Giyim',
        stock: 20
      },
      // Kitap & Hobi Kategorisi
      {
        id: 17,
        name: 'Roman',
        price: 85.0,
        description: 'Sert kapak, 400 sayfa',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        category: 'Kitap & Hobi',
        stock: 50
      },
      {
        id: 18,
        name: 'Satranç Takımı',
        price: 450.0,
        description: 'Ahşap, Manyetik',
        image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500',
        category: 'Kitap & Hobi',
        stock: 15
      },
      {
        id: 19,
        name: 'Puzzle',
        price: 250.0,
        description: '1000 Parça, Manzara',
        image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500',
        category: 'Kitap & Hobi',
        stock: 25
      }
    ];

    this.saveToLocalStorage();
  }

  getItems(): ShoppingItem[] {
    return this.items;
  }

  getItem(id: number): ShoppingItem | undefined {
    return this.items.find(item => item.id === id);
  }

  getStoreItems(): StoreItem[] {
    return this.storeItems;
  }

  getStoreItemsByCategory(category: string): StoreItem[] {
    return this.storeItems.filter(item => item.category === category);
  }

  getCategories(): string[] {
    return [...this.categories];
  }

  addCategory(category: string): boolean {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
      return true;
    }
    return false;
  }

  deleteCategory(category: string): boolean {
    let categories = this.getCategories();
    const index = categories.indexOf(category);
    if (index > -1) {
      categories.splice(index, 1);
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
      return true;
    }
    return false;
  }

  addStoreItem(item: Omit<StoreItem, 'id'>): StoreItem {
    const newItem: StoreItem = {
      ...item,
      id: Math.max(...this.storeItems.map(i => i.id), 0) + 1
    };
    
    this.storeItems.push(newItem);
    this.saveToLocalStorage();
    return newItem;
  }

  updateStoreItem(item: StoreItem): boolean {
    const index = this.storeItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.storeItems[index] = { ...item };
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  deleteStoreItem(id: number): boolean {
    const index = this.storeItems.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.storeItems = this.storeItems.filter(item => item.id !== id);
    this.saveToLocalStorage();
    return true;
  }

  addToCart(storeItem: StoreItem, quantity: number = 1): ShoppingItem | null {
    const currentStock = this.getStockForItem(storeItem.id);
    if (currentStock < quantity) {
      return null;
    }

    const itemTotal = storeItem.price * quantity;
    if (itemTotal > this.remainingBudget) {
      return null;
    }

    const existingItem = this.items.find(item => item.name === storeItem.name);
    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      if (currentStock < updatedQuantity) {
        return null;
      }
      const result = this.updateItem(existingItem.id, { ...existingItem, quantity: updatedQuantity });
      this.saveToLocalStorage();
      return result;
    }

    const newItem: ShoppingItem = {
      id: Math.max(...this.items.map(i => i.id).concat([0])) + 1,
      name: storeItem.name,
      quantity: quantity,
      price: storeItem.price
    };

    this.items.push(newItem);
    this.remainingBudget = this.totalBudget - this.getTotalSpent();
    this.saveToLocalStorage();
    return newItem;
  }

  updateItem(id: number, item: Partial<ShoppingItem>): ShoppingItem | null {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return null;

    const oldTotal = this.items[index].price * this.items[index].quantity;
    const newTotal = (item.price || this.items[index].price) * 
                    (item.quantity || this.items[index].quantity);
    const budgetDifference = newTotal - oldTotal;

    if (budgetDifference > this.remainingBudget) {
      return null;
    }

    this.items[index] = { ...this.items[index], ...item };
    this.remainingBudget = this.totalBudget - this.getTotalSpent();
    this.saveToLocalStorage();
    return this.items[index];
  }

  deleteItem(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) {
      this.items = this.items.filter(i => i.id !== id);
      this.remainingBudget = this.totalBudget - this.getTotalSpent();
      this.saveToLocalStorage();
    }
  }

  confirmOrder(): void {
    for (const cartItem of this.items) {
      const storeItem = this.storeItems.find(item => item.name === cartItem.name);
      if (storeItem) {
        storeItem.stock -= cartItem.quantity;
      }
    }

    const totalSpent = this.getTotalSpent();
    this.totalBudget -= totalSpent;
    this.remainingBudget = this.totalBudget;
    this.items = [];
    this.saveToLocalStorage();
  }

  updateBudget(additionalAmount: number): boolean {
    if (additionalAmount <= 0) {
      return false;
    }
    
    this.totalBudget += additionalAmount;
    this.remainingBudget = this.totalBudget - this.getTotalSpent();
    this.saveToLocalStorage();
    return true;
  }

  getTotalSpent(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalBudget(): number {
    return this.totalBudget;
  }

  getRemainingBudget(): number {
    return this.remainingBudget;
  }

  getStockForItem(id: number): number {
    const item = this.storeItems.find(item => item.id === id);
    return item ? item.stock : 0;
  }

  updateStockForItem(id: number, newStock: number): boolean {
    const index = this.storeItems.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.storeItems[index].stock = newStock;
    this.saveToLocalStorage();
    return true;
  }

  getStoreItemById(id: number): StoreItem | null {
    const item = this.storeItems.find(item => item.id === id);
    return item || null;
  }
} 