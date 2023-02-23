import { Component, OnInit } from '@angular/core';
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
    this.productList = this.productsService.getAllProducts();
  }
}
