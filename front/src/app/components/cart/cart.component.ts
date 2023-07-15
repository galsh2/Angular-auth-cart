import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
// import { CartService } from 'src/app/services/cart.service';
// import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    this.cartService.cartObservable.subscribe(updatedCart => {
      this.cart = updatedCart;
    });
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  incrementQuantity(index: number): void {
    this.cartService.incrementQuantity(index);
  }

  decrementQuantity(index: number): void {
    this.cartService.decrementQuantity(index);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/services/cart.service';
// // import { CartService } from '../cart.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cart:any[] = [];

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.cart = this.cartService.getCart();
//   }

//   removeFromCart(product: any): void {
//     this.cartService.removeFromCart(product);
//     this.cart = this.cartService.getCart();
//   }
// }



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent {

// }
