import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(
      'https://dummyjson.com/products?skip=0&limit=100'
    );
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      `https://dummyjson.com/products/category/${category}`
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }

  getMinPrice(products: Product[]) {
    let price: number = Number.MAX_VALUE;
    products.forEach((product) => {
      if (product.price < price) {
        price = product.price;
      }
    });

    return price;
  }

  getProductsBrands(products: Product[]) {
    let brands: string[] = [];
    products.forEach((product) => {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });

    return brands;
  }

  getMaxPrice(products: Product[]) {
    let price: number = 0;
    products.forEach((product) => {
      if (product.price > price) {
        price = product.price;
      }
    });

    return price;
  }

  getHighPrice(price: number, discount: number): number {
    const hp = price / (1 - discount / 100);

    return parseFloat(hp.toFixed(2));
  }

  filterByRubric(products: Product[], rubric: string[]): Product[] {
    let productsList: Product[] = [];
    rubric.forEach((category) => {
      products.forEach((product) => {
        if (product.category === category) {
          productsList.push(product);
        }
      });
    });

    return productsList;
  }

  filterByBrands(products: Product[], brands: string[]): Product[] {
    let productsList: Product[] = [];
    if (brands.length > 0) {
      brands.forEach((brand) => {
        products.forEach((product) => {
          if (product.brand.toLowerCase().split(' ').join('') === brand) {
            productsList.push(product);
          }
        });
      });
    } else {
      productsList = products;
    }

    return productsList;
  }

  filterByPrice(
    products: Product[],
    minPrice: number,
    maxPrice: number
  ): Product[] {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  sortProducts(products: Product[], sortKey: string): Product[] {
    switch (sortKey) {
      case 'default':
        return products;
      case 'asc-price':
        return products.sort((a, b) => {
          return a.price - b.price;
        });
      case 'desc-price':
        return products.sort((a, b) => {
          return b.price - a.price;
        });
      case 'rating':
        return products.sort((a, b) => {
          return b.rating - a.rating;
        });
      default:
        return products;
    }
  }

  isInvalidId(id: number): boolean {
    if (isNaN(id) || id > 100 || id < 1) {
      return true;
    }

    return false;
  }

  searchByBrand(products: Product[], search: string | undefined): Product[] {
    if (search !== undefined) {
      return products.filter((product) =>
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    return [];
  }

  searchByCategory(products: Product[], search: string | undefined) {
    if (search !== undefined) {
      return products.filter((product) =>
        product.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    return [];
  }

  searchByDescription(
    products: Product[],
    search: string | undefined
  ): Product[] {
    if (search !== undefined) {
      return products.filter((product) =>
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return [];
  }
}
