import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search!: FormControl;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.search = new FormControl('');
  }

  goToCartPage() {
    this.router.navigate(['cart']);
  }

  setSearch(): void {
    this.searchEvent.emit(this.search.value);
  }
}
