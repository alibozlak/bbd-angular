import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { HomeComponent } from './components/home-component/home-component';
import { authGuard } from './guards/auth.guard';
import { AddOrUpdateProductComponent } from './components/add-or-update-product-component/add-or-update-product-component/add-or-update-product-component';

export const routes: Routes = [
    {path : 'login', component : Login},
    {path : "home", component : HomeComponent, canActivate : [authGuard]},
    {path : '', redirectTo : 'home', pathMatch : 'full'},
    {path : 'add-or-update-product', component : AddOrUpdateProductComponent, canActivate : [authGuard]}
];
