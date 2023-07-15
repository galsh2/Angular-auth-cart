import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbartwoComponent } from './components/navbartwo/navbartwo.component';
import { LogintwoComponent } from './components/logintwo/logintwo.component';
import { LogouttwoComponent } from './components/logouttwo/logouttwo.component';
import { FormsModule } from '@angular/forms';
import { RegistertwoComponent } from './components/registertwo/registertwo.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    NavbartwoComponent,
    LogintwoComponent,
    LogouttwoComponent,
    RegistertwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
