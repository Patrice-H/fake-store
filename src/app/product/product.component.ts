import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  highPrice!: number;
  displayedImage!: string;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.product = this.getProductDetails();
    this.highPrice = this.getHighPrice(
      this.product.price,
      this.product.discountPercentage
    );
    this.displayedImage = this.product.images[this.product.images.length - 1];
  }

  getProductDetails(): Product {
    const id = parseInt(window.location.href.split('/')[4]);
    return this.productsService.getProductById(id);
  }

  getHighPrice(price: number, discount: number): number {
    const hp = price / (1 - discount / 100);

    return parseFloat(hp.toFixed(2));
  }

  getThumbClasses(id: number): string {
    let classes = 'thumbnail-img';
    if (id === this.product.images.length - 1) {
      classes += ' active-thumbnail';
    }

    return classes;
  }

  setActive(id: number): void {
    const thumbnails = Array.from(
      document.getElementsByClassName('thumbnail-img')
    );
    const activeThumb = document.getElementById(`thumb-${id}`);
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('active-thumbnail');
    });
    activeThumb?.classList.add('active-thumbnail');
    this.displayedImage = this.product.images[id];
  }
}
