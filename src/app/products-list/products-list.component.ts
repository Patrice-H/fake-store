import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { RUBRIC_CATEGORIES } from 'src/data/constants';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  productList!: Product[];
  productList$!: Observable<any>;
  productsDisplayed!: Product[];
  rubricsList!: string[];
  brandsFilter!: string;
  private destroy$!: Subject<boolean>;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let filter = params;
      this.brandsFilter = filter.brands;
      this.setProductsDisplayed();
    });
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.rubricsList = this.setRubrics();
    this.getProductsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.productList = [];
  }

  setProductsDisplayed() {
    let products: Product[] = [];
    if (this.brandsFilter === undefined) {
      this.productsDisplayed = this.productList;
    } else {
      const filters = this.brandsFilter.split('-');
      filters.forEach((filter) => {
        this.productList.forEach((product) => {
          if (this.formatBrandName(product.brand) === filter) {
            products.push(product);
          }
        });
      });
      this.productsDisplayed = products;
    }
  }

  setRubrics(): string[] {
    let rubrics: string[] = [];
    RUBRIC_CATEGORIES.forEach((rubric) => {
      rubrics.push(rubric.name);
    });

    return rubrics;
  }

  getProductsList(): void {
    const selectedMenu = window.location.href.split('/')[3].split('?')[0];
    if (selectedMenu === '' || this.rubricsList.includes(selectedMenu)) {
      this.productList$ = this.productsService.getAllProducts();
    } else {
      this.productList$ =
        this.productsService.getProductsByCategory(selectedMenu);
    }
    this.setList(selectedMenu);
  }

  setList(selectedMenu: string): void {
    this.productList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
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
      this.setProductsDisplayed();
    });
  }

  formatBrandName(brand: string) {
    return brand.toLowerCase().split(' ').join('');
  }
}
