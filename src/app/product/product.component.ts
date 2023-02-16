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

  ngOnInit() {}
}
