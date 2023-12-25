import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './services/products.service';
import { Router } from '@angular/router';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  productsSearched!: Product[];
  allProducts$!: Observable<any>;
  allProducts!: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allProducts$ = this.productsService.getAllProducts();
    this.allProducts$.subscribe((value) => {
      this.allProducts = Array.from(value.products);
    });
    this.productsSearched = this.allProducts;
  }

  searchProducts(search: string) {
    this.productsSearched = this.productsService.researchProducts(
      this.allProducts,
      search
    );

    console.log(this.productsSearched);
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([]));
  }
}
