import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  currentRubric!: string;

  ngOnInit() {
    this.currentRubric = this.getRubric(this.product.category);
  }

  getRubric(category: string): string {
    switch (category) {
      case 'smartphones' || 'laptops':
        return 'high-tech';
      case 'home-decoration' || 'lighting' || 'furniture':
        return 'home';
      case 'fragances' || 'skincare':
        return 'cosmetic';
      case 'automotive' || 'motorcycle':
        return 'auto-moto';
      case 'mens-shirts' || 'mens-shoes':
        return 'man';
      case 'tops' || 'womens-dresses' || 'womens-shoes':
        return 'woman';
      case 'mens-watches' ||
        'womens-watches' ||
        'womens-bags' ||
        'womens-jewellery' ||
        'sunglasses':
        return 'accessory';
      default:
        return 'other';
    }
  }
}
