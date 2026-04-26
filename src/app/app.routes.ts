import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { HomeComponent } from './components/home-component/home-component';
import { authGuard } from './guards/auth.guard';
import { AddOrUpdateProductComponent } from './components/add-or-update-product-component/add-or-update-product-component/add-or-update-product-component';
import { AddOrUpdateBbdRecordComponent } from './components/add-or-update-bbdrecord-component/add-or-update-bbd-record-component/add-or-update-bbd-record-component';
import { EditBbdRecordComponent } from './components/edit-bbd-record-component/edit-bbd-record-component';
import { UpdateBbdRecordComponent } from './components/update-bbd-record-component/update-bbd-record-component';

export const routes: Routes = [
    {path : 'login', component : Login},
    {path : "home", component : HomeComponent, canActivate : [authGuard]},
    {path : '', redirectTo : 'home', pathMatch : 'full'},
    {path : 'add-or-update-product', component : AddOrUpdateProductComponent, canActivate : [authGuard]},
    {path : 'add-or-update-bbd-record', component : AddOrUpdateBbdRecordComponent, canActivate : [authGuard]},
    {path : 'update-bbd-record/:bbdRecordId', component : UpdateBbdRecordComponent, canActivate : [authGuard]},
    {path : 'edit-bbd-record/:bbdRecordId', component : EditBbdRecordComponent, canActivate : [authGuard]}
];
