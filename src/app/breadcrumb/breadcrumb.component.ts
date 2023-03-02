import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { RUBRIC_CATEGORIES } from 'src/data/constants';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  rubrics!: string[];
  categories!: string[];
  currentRubric!: string | undefined;
  currentCategory!: string | undefined;
  product!: Product | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rubrics = this.getAllRubrics();
    this.categories = this.getAllCategories();
    this.getCurrentElements();
    window.addEventListener('click', () => this.getCurrentElements());
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
    const urlArray = window.location.href.split('/');
    if (urlArray.length === 4 && this.rubrics.includes(urlArray[3])) {
      this.currentRubric = urlArray[3];
    }
    if (urlArray.length === 4 && this.categories.includes(urlArray[3])) {
      this.currentCategory = urlArray[3];
      this.currentRubric = this.setCurrentRubric(this.currentCategory);
    }
    if (urlArray.length === 5 && urlArray[3] === 'product') {
      this.product = this.productsService.getProductById(parseInt(urlArray[4]));
      this.currentCategory = this.product.category;
      this.currentRubric = this.setCurrentRubric(this.currentCategory);
    }
  }

  isRubricPage(): boolean {
    if (
      window.location.href.split('/').length === 4 &&
      this.rubrics.includes(window.location.href.split('/')[3])
    ) {
      return true;
    }

    return false;
  }

  isCategoryPage(): boolean {
    if (
      window.location.href.split('/').length === 4 &&
      this.categories.includes(window.location.href.split('/')[3])
    ) {
      return true;
    }

    return false;
  }

  isProductPage(): boolean {
    if (
      window.location.href.split('/').length === 5 &&
      window.location.href.split('/')[3] === 'product' &&
      this.product !== undefined
    ) {
      return true;
    }

    return false;
  }

  isBreadCrumbNecessary(): boolean {
    const urlArray = window.location.href.split('/');
    if (
      urlArray.length >= 3 &&
      (urlArray[3] === 'product' ||
        this.rubrics.includes(urlArray[3]) ||
        this.categories.includes(urlArray[3]))
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
