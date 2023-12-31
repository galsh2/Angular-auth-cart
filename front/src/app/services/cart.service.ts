import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authtwo.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  cartObservable = new Subject<any[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  addToCart(product: any): void {
    let productInCart = this.cart.find(item => item.id === product.id);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      product.quantity = 1;
      // this.cart.push(product);
      // this.cart.push(product.id, product.name, product.price,product.quantity);
      this.cart.push({id: product.id, name: product.name, price: product.price, quantity: product.quantity});
    }
    this.saveCart();
  }

  // getCart(): any[] {
  //   if (this.authService.isLoggedIn()) {
  //     // If user is logged in, get the cart from backend
  //     this.http.get('/app/cart').subscribe((items: any) => {
  //       this.cart = items;
  //       this.cartObservable.next(this.cart);
  //     });
  //   } else {
  //     // Otherwise, get it from localStorage
  //     this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  //     this.cartObservable.next(this.cart);
  //   }
  //   return this.cart;
  // }

  getCart(): any[] {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return this.cart;
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  incrementQuantity(index: number): void {
    this.cart[index].quantity++;
    this.saveCart();
  }

  decrementQuantity(index: number): void {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.saveCart();
    }
  }

  // saveCart(): void {
  //   if (this.authService.isLoggedIn()) {
  //     // If user is logged in, save the cart to the backend
  //     this.cart.forEach(item => {
  //       this.http.post('/app/cart', item).subscribe();
  //     });
  //   } else {
  //     // Otherwise, save it to localStorage
  //     localStorage.setItem('cart', JSON.stringify(this.cart));
  //   }
  //   this.cartObservable.next(this.cart);
  // }

  private saveCart(): void {
    this.authService.onUserLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        console.log('User is logged in. Saving cart...');
      } else {
        console.log('User is not logged in. Cart will be saved locally.');
      }

      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.cartObservable.next(this.cart);
    });

    // Emit the event to check if the user is logged in
    this.authService.checkUserLoggedIn();
  }


//   private saveCart(): void {
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//     this.cartObservable.next(this.cart);
//   }
}



// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cart:any [] = [];
//   cartObservable = new Subject<any[]>();

//   constructor() {}

//   addToCart(product: any): void {
//     let productInCart = this.cart.find(item => item.id === product.id);

//     if (productInCart) {
//       productInCart.quantity++;
//     } else {
//       product.quantity = 1;
//       this.cart.push(product);
//     }

//     this.saveCart();
//   }

//   getCart(): any[] {
//     this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     return this.cart;
//   }

//   removeFromCart(index: number): void {
//     this.cart.splice(index, 1);
//     this.saveCart();
//   }

//   incrementQuantity(index: number): void {
//     this.cart[index].quantity++;
//     this.saveCart();
//   }

//   decrementQuantity(index: number): void {
//     if (this.cart[index].quantity > 1) {
//       this.cart[index].quantity--;
//       this.saveCart();
//     }
//   }

//   private saveCart(): void {
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//     this.cartObservable.next(this.cart);
//   }
// }



// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   constructor() {}

//   addToCart(product: any): void {
//     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }

//   getCart(): any[] {
//     return JSON.parse(localStorage.getItem('cart') || '[]');
//   }

//   removeFromCart(product: any): void {
//     let cart = this.getCart();
//     let index = cart.findIndex(p => p.id === product.id);

//     if (index >= 0) {
//       cart.splice(index, 1);
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }
//   }
// }



// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   constructor() { }
// }
