import { Routes } from '@angular/router';
import { PRODUCT_ROUTES } from './products/products.route';

export const APP_ROUTES: Routes = [
    {path: '', redirectTo:'/products', pathMatch:'full'},
    {path: 'products', children: PRODUCT_ROUTES}
];
