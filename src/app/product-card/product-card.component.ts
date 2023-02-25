import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  showProductDetails(id: number): void {
    this.router.navigate([`/product/${id}`]);
  }
}
