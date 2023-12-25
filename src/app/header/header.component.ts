import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { RUBRIC_CATEGORIES } from 'src/data/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search!: FormControl;
  @Output() searchEvent = new EventEmitter<string>();
  productList$!: Observable<any>;
  productList!: Product[];
  rubricsList!: string[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.search = new FormControl('');
  }

  goToCartPage() {
    this.router.navigate(['cart']);
  }

  setSearch(): void {
    this.searchEvent.emit(this.search.value);
  }

  setRubrics(): string[] {
    let rubrics: string[] = [];
    RUBRIC_CATEGORIES.forEach((rubric) => {
      rubrics.push(rubric.name);
    });

    return rubrics;
  }
  /*
  setProductsDisplayed() {
    let products: Product[] = [];
    if (this.productList === undefined) {
      return;
    }
    let brands: string[] = [];
    if (this.brandsFilter !== undefined) {
      brands = this.brandsFilter.split('-');
    }
    if (isNaN(this.minPrice)) {
      this.minPrice = this.productsService.getMinPrice(this.productList);
    }
    if (isNaN(this.maxPrice)) {
      this.maxPrice = this.productsService.getMaxPrice(this.productList);
    }
    products = this.productsService.filterByBrands(this.productList, brands);
    products = this.productsService.filterByPrice(
      products,
      this.minPrice,
      this.maxPrice
    );
    products = this.productsService.sortProducts(products, this.sortKey);
    this.productsDisplayed = products;
  }
*/
  getProductsList(): void {
    const selectedMenu = this.router.url.split('/')[1].split('?')[0];
    if (selectedMenu === '' || this.rubricsList.includes(selectedMenu)) {
      this.productList$ = this.productsService.getAllProducts();
    } else {
      this.productList$ =
        this.productsService.getProductsByCategory(selectedMenu);
    }
    this.productList$.subscribe((value) => {
      if (this.rubricsList.includes(selectedMenu)) {
        let rubric: any | undefined = RUBRIC_CATEGORIES.find(
          (rubric) => rubric.name === selectedMenu
        );
        this.productList = this.productsService.filterByRubric(
          value.products,
          rubric?.categories
        );
      } else {
        this.productList = value.products;
      }
      //this.setProductsDisplayed();
    });
  }
}
