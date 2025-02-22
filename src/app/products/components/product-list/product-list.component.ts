import { Component, inject, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../interfaces/products';
import { CommonModule } from '@angular/common';

//materials 
import {MatButtonModule} from '@angular/material/button'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private dialog = inject(MatDialog)
  private router= inject(Router)
  private productService = inject(ProductService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  displayedColumns: string[] = ["id", "description", "stock", "actions"];
  dataSource = new MatTableDataSource<Product>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next:(products) => {
        this.products.set(products);
        this.updateTableData();
      }
    })
  }

  updateTableData(){
    this.dataSource.data = this.products();
    this.dataSource.paginator = this.paginator;
  }

  navigateToForm(id?:number){
    const path = id? `/products/edit/${id}` : 'products/new';
    this.router.navigate([path]);
  }

  deleteProduct(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.productService.deleteProduct(id).subscribe( () =>{
          const updatedProducts = this.products().filter((product => product.id !== id));
          this.products.set(updatedProducts);
          this.updateTableData();
        })
      }
    })
  }
}
