import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CATEGORIES, RUBRICS } from 'src/data/constants';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  rubrics: string[] = RUBRICS;
  categories: string[] = CATEGORIES;
  currentRubric!: string | undefined;
  currentCategory!: string | undefined;
  product!: Product | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentElements();
    window.addEventListener('click', () => this.getCurrentElements());
  }

  setCurrentRubric(category: string): string {
    switch (category) {
      case 'smartphones':
        return 'high-tech';
      case 'laptops':
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
      case 'groceries':
        return 'others';
      default:
        throw new Error("can't define rubric");
    }
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
  /*
  isBreadCrumbNecessary(): boolean {
    if (this.isCategoryPage() || this.isRubricPage() || this.isProductPage()) {
      return true;
    }

    return false;
  }
  */
  goToHomePage(): void {
    this.router.navigate(['']);
  }

  goToCategoryPage(): void {
    this.router.navigate([`/${this.currentCategory}`]);
  }
}
