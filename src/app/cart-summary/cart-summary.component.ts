import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent {
  @Input() items: any;
  displayedColumns: string[] = ['quantity', 'title', 'price'];

  getItemPrice(id: number): number {
    let item = this.items.find((item: any) => item.id === id);

    return item.price * item.quantity;
  }

  getTotalCost(): number {
    let total = 0;
    this.items.forEach((item: any) => {
      total += item.price * item.quantity;
    });

    return total;
  }
}
