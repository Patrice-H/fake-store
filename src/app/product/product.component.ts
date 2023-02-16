import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id!: number;
  title!: string;
  price!: number;
  description!: string;
  category!: string;
  image!: string;

  ngOnInit() {
    this.id = 1;
    this.title = 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops';
    this.price = 109.95;
    this.description =
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday';
    this.category = "men's clothing";
    this.image = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';
  }
}
