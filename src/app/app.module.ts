import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    HeaderComponent,
    ProductCardComponent,
    ProductsListComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
