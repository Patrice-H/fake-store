import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { Error404Component } from './error404/error404.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RatingsComponent } from './ratings/ratings.component';
import { FilteringComponent } from './filtering/filtering.component';
import { SortingComponent } from './sorting/sorting.component';
import { SetUpComponent } from './set-up/set-up.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductsListComponent,
    Error404Component,
    BreadcrumbComponent,
    RatingsComponent,
    FilteringComponent,
    SortingComponent,
    SetUpComponent,
    CartComponent,
    CartItemComponent,
    CartSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
