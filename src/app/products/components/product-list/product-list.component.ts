import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import { ProductService } from '../../../services/product.service';
import { Product } from '../../interfaces/products';
@Component({
  selector: 'app-product-list',
  imports: [MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next:(response) =>{
          console.log(response);
        },
        error:(err) => {
          console.log('Error getting products:', err)
        }
      });
  }
}
