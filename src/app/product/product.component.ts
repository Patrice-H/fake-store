import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;
  product$!: Observable<any>;
  highPrice!: number;
  displayedImage!: string;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = parseInt(this.router.url.split('/')[2]);
    if (this.productsService.isInvalidId(id)) {
      this.router.navigate(['/error']);

      return;
    }
    this.product$ = this.productsService.getProductById(id);
    this.product$.subscribe((value) => {
      this.product = value;
      this.highPrice = this.productsService.getHighPrice(
        this.product.price,
        this.product.discountPercentage
      );
      this.displayedImage = this.product.images[this.product.images.length - 1];
    });
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

  addToCart() {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem('order'));
    const newItem = {
      ...this.product,
      quantity: 1,
    };
    let order: any[] = [];

    if (items !== null) {
      items.forEach((item: any) => {
        order.push(item);
      });
    }
    order.push(newItem);
    localStorage.setItem('order', JSON.stringify(order));
  }
}
