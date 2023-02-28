import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { RUBRICS } from 'src/data/constants';

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
    } else if (RUBRICS.includes(selectedMenu)) {
      this.productList = this.productsService.getProductsByRubric(selectedMenu);
    } else {
      this.productList =
        this.productsService.getProductsByCategory(selectedMenu);
    }
  }
}
