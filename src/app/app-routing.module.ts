import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'smartphones', component: ProductsListComponent },
  { path: 'laptops', component: ProductsListComponent },
  { path: 'home-decoration', component: ProductsListComponent },
  { path: 'lighting', component: ProductsListComponent },
  { path: 'furniture', component: ProductsListComponent },
  { path: 'fragances', component: ProductsListComponent },
  { path: 'skincare', component: ProductsListComponent },
  { path: 'automotive', component: ProductsListComponent },
  { path: 'motorcycle', component: ProductsListComponent },
  { path: 'tops', component: ProductsListComponent },
  { path: 'womens-dresses', component: ProductsListComponent },
  { path: 'womens-shoes', component: ProductsListComponent },
  { path: 'mens-shirts', component: ProductsListComponent },
  { path: 'mens-shoes', component: ProductsListComponent },
  { path: 'mens-watches', component: ProductsListComponent },
  { path: 'womens-watches', component: ProductsListComponent },
  { path: 'womens-bags', component: ProductsListComponent },
  { path: 'womens-jewellery', component: ProductsListComponent },
  { path: 'sunglasses', component: ProductsListComponent },
  { path: 'groceries', component: ProductsListComponent },
  { path: 'product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
