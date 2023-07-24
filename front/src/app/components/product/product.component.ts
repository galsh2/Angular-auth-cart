// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/services/cart.service';
// import { ProductService } from 'src/app/services/product.service';
// // import { ProductService } from '../product.service';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   products: any[] = [];

//   constructor(private productService: ProductService,private cartService: CartService) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(products => {
//       this.products = products;
//       // console.log(products);
      
//     });
//   }
//   addToCart(product:any): void {
//     this.cartService.addToCart(product);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authtwo.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  accessToken: string = ''; // Declare a variable to hold the access token

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Get the access token from localStorage
    this.accessToken = localStorage.getItem('access_token')!;
    
    // Call the API to fetch products
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.accessToken).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Your other methods...
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent {

// }
