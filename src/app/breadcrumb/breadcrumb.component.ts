import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { RUBRIC_CATEGORIES } from 'src/data/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  rubrics!: string[];
  categories!: string[];
  currentRubric!: string | undefined;
  currentCategory!: string | undefined;
  product!: Product;
  product$!: Observable<any>;
  path!: string;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rubrics = this.getAllRubrics();
    this.categories = this.getAllCategories();
    this.path = this.router.url.split('/')[1].split('?')[0];
    this.getCurrentElements();
    window.addEventListener('click', () => this.getCurrentElements());
  }

  ngOnDestroy() {
    this.path = '';
  }

  getAllRubrics(): string[] {
    let rubrics: string[] = [];
    RUBRIC_CATEGORIES.forEach((rubric) => {
      rubrics.push(rubric.name);
    });

    return rubrics;
  }

  getAllCategories(): string[] {
    let categories: string[] = [];
    RUBRIC_CATEGORIES.forEach((rubric) => {
      rubric.categories.forEach((category: string) => {
        categories.push(category);
      });
    });

    return categories;
  }

  setCurrentRubric(category: string): string {
    let element = RUBRIC_CATEGORIES.find((rubric) =>
      rubric.categories.includes(category)
    );

    return element.name;
  }

  getCurrentElements(): void {
    if (this.rubrics.includes(this.path)) {
      this.currentRubric = this.path;
    }
    if (this.categories.includes(this.path)) {
      this.currentCategory = this.path;
      this.currentRubric = this.setCurrentRubric(this.currentCategory);
    }
    if (this.path === 'product') {
      this.product$ = this.productsService.getProductById(
        parseInt(this.router.url.split('/')[2])
      );
      this.product$.subscribe((value) => {
        this.product = value;
        this.currentCategory = this.product.category;
        this.currentRubric = this.setCurrentRubric(this.currentCategory);
      });
    }
  }

  isCategoryPage(): boolean {
    if (this.categories.includes(this.path)) {
      return true;
    }

    return false;
  }

  isProductPage(): boolean {
    if (this.path === 'product' && this.product !== undefined) {
      return true;
    }

    return false;
  }

  isBreadCrumbNecessary(): boolean {
    if (
      this.path === 'product' ||
      this.rubrics.includes(this.path) ||
      this.categories.includes(this.path)
    ) {
      return true;
    }

    return false;
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }

  goToRubricPage(): void {
    this.router.navigate([`/${this.currentRubric}`]);
  }

  goToCategoryPage(): void {
    this.router.navigate([`/${this.currentCategory}`]);
  }
}
