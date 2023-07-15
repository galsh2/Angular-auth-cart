import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { NavbartwoComponent } from './components/navbartwo/navbartwo.component';
import { CartComponent } from './components/cart/cart.component';
import { LogintwoComponent } from './components/logintwo/logintwo.component';
import { LogouttwoComponent } from './components/logouttwo/logouttwo.component';
import { RegistertwoComponent } from './components/registertwo/registertwo.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'navbar', component: NavbartwoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LogintwoComponent },
  { path: 'logout', component: LogouttwoComponent },
  { path: 'register', component: RegistertwoComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
