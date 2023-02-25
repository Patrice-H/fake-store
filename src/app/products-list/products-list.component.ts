import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productList!: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    const selectedMenu = window.location.href.split('/')[3];
    if (selectedMenu === '') {
      this.productList = this.productsService.getAllProducts();
    } else {
      this.productList =
        this.productsService.getProductsByCategory(selectedMenu);
    }
  }
}
