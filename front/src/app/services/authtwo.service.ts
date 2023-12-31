import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartService } from './cart.service';

interface LoginResponse {
  access: string;
  refresh: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/'; // Replace with your API URL
  private loginUrl = 'http://localhost:8000/app/token/';
  private logoutUrl = 'http://localhost:8000/app/token/blacklist/';
  private tokenKey = 'access_token';
  private token : string = '';
  onUserLoggedIn = new EventEmitter<boolean>();

  checkUserLoggedIn(): void {
    const isLoggedIn = this.isLoggedIn();
    this.onUserLoggedIn.emit(isLoggedIn);
  }

  constructor(private http: HttpClient) { }
  // constructor(private http: HttpClient, private cartService: CartService) { }

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem(this.tokenKey);

    if (accessToken) {
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const decodedToken = JSON.parse(atob(tokenParts[1]));
        const tokenExpirationDate = new Date(decodedToken.exp * 1000);
        const currentDate = new Date();
        return tokenExpirationDate > currentDate;
      }
    }

    return false;
  }

//   isLoggedIn(): boolean {
//     // Implement your logic here.
//     return false;
// }

  register(username: string, email: string, password: string): Observable<any> {
    const registrationData = {
      username: username,
      email: email,
      password: password
    };

    return this.http.post(`${this.apiUrl}app/register/`, registrationData);
  }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(this.loginUrl, { username, password });
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access);
        // Emit the event to indicate that the user is logged in
        this.onUserLoggedIn.emit(true);
      })
    );
  }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(this.loginUrl, { username, password }).pipe(
  //     tap(() => {
  //       // Emit the event to indicate that the user is logged in
  //       this.onUserLoggedIn.emit(true);
  //     })
  //   );
  // }

  logout(refreshToken: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    
    return this.http.post(this.logoutUrl, { refresh_token: refreshToken }, httpOptions);
  }

  getToken() {
    return this.token;
  }
  }













// import { EventEmitter, Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// interface LoginResponse {
//   access: string;
//   refresh: string;
//   username: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8000/';
//   private loginUrl = 'http://localhost:8000/app/token/';
//   private logoutUrl = 'http://localhost:8000/app/token/blacklist/';
//   private tokenKey = 'access_token';
//   private token: string = '';
//   onUserLoggedIn = new EventEmitter<void>();

//   constructor(private http: HttpClient) { }

//   isLoggedIn(): boolean {
//     const accessToken = localStorage.getItem(this.tokenKey);

//     if (accessToken) {
//       const tokenParts = accessToken.split('.');
//       if (tokenParts.length === 3) {
//         const decodedToken = JSON.parse(atob(tokenParts[1]));
//         const tokenExpirationDate = new Date(decodedToken.exp * 1000);
//         const currentDate = new Date();
//         return tokenExpirationDate > currentDate;
//       }
//     }

//     return false;
//   }

//   register(username: string, email: string, password: string): Observable<any> {
//     const registrationData = {
//       username: username,
//       email: email,
//       password: password
//     };

//     return this.http.post(`${this.apiUrl}app/register/`, registrationData);
//   }

//   login(username: string, password: string): Observable<any> {
//     return this.http.post(this.loginUrl, { username, password }).pipe(
//       tap(() => {
//         this.onUserLoggedIn.emit();
//       })
//     );
//   }

//   logout(refreshToken: string): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
//       })
//     };

//     return this.http.post(this.logoutUrl, { refresh_token: refreshToken }, httpOptions).pipe(
//       tap(() => {
//         // Clear local storage when the user logs out
//         localStorage.clear();
//       })
//     );
//   }
// }




// // // import { Injectable } from '@angular/core';
// // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // import { Observable } from 'rxjs';
// // // import { tap } from 'rxjs/operators';

// // // interface LoginResponse {
// // //   access: string;
// // //   refresh: string;
// // //   username: string;
// // // }

// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class AuthService {
// // //   private apiUrl = 'http://localhost:8000/'; // Replace with your API URL
// // //   private loginUrl = 'http://localhost:8000/app/token/';
// // //   private logoutUrl = 'http://localhost:8000/app/token/blacklist/';
// // //   private tokenKey = 'access_token';
// // //   private token: string = '';

// // //   constructor(private http: HttpClient) { }

// // //   isLoggedIn(): boolean {
// // //     // Implement your logic here.
// // //     return false;
// // //   }

// // //   register(username: string, email: string, password: string): Observable<any> {
// // //     const registrationData = {
// // //       username: username,
// // //       email: email,
// // //       password: password
// // //     };

// // //     return this.http.post(`${this.apiUrl}app/register/`, registrationData);
// // //   }

// // //   login(username: string, password: string): Observable<any> {
// // //     return this.http.post(this.loginUrl, { username, password }).pipe(tap((data: any) => {
// // //       localStorage.setItem('access_token', data.access);
// // //       localStorage.setItem('refresh_token', data.refresh);
// // //       console.log('user logged in:', data.username);

// // //   //     // Save the cart to the backend
// // //   //     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
// // //   //     cart.forEach((item : any)=> {
// // //   //       console.log(item)
// // //   //       this.http.put(`${this.apiUrl}app/cart-item/`, item).subscribe();
// // //   //     });
// // //   //   }));
// // //   // }

// // //       // Save the cart to the backend
// // //       const cart = JSON.parse(localStorage.getItem('cart') || '[]');
// // //       const httpOptions = {
// // //         headers: new HttpHeaders({
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
// // //         })
// // //       };
// // //       cart.forEach((item : any)=> {
// // //         console.log(item);
// // //         const itemUrl = `${this.apiUrl}app/cart-item/${item.id}/`;  // assuming the item object has 'id' property
// // //         this.http.put(itemUrl, item, httpOptions).subscribe();
// // //       });
// // //     }));
// // //   }


// // //   logout(refreshToken: string): Observable<any> {
// // //     const httpOptions = {
// // //       headers: new HttpHeaders({
// // //         'Content-Type': 'application/json',
// // //         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
// // //       })
// // //     };

// // //     return this.http.post(this.logoutUrl, { refresh_token: refreshToken }, httpOptions);
// // //   }

// // //   getToken() {
// // //     return this.token;
// // //   }
// // // }
























// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { tap } from 'rxjs/operators';
// // import { CartService } from './cart.service';
// // // import jwt_decode from 'jsonwebtoken';
// // import * as jwt_decode from 'jsonwebtoken';

// // interface LoginResponse {
// //   access: string;
// //   refresh: string;
// //   username: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private apiUrl = 'http://localhost:8000/'; // Replace with your API URL
// //   private loginUrl = 'http://localhost:8000/app/token/';
// //   private logoutUrl = 'http://localhost:8000/app/token/blacklist/';
// //   private tokenKey = 'access_token';
// //   private token : string = '';

// //   constructor(private http: HttpClient) { }
// //   // constructor(private http: HttpClient, private cartService: CartService) { }

// // isLoggedIn(): boolean {
// //   const accessToken = localStorage.getItem(this.tokenKey);

// //   if (accessToken) {
// //     try {
// //       // Verify the access token
// //       const decodedToken: any = jwt_decode(accessToken);

// //       // Check if the token has expired
// //       const tokenExpirationDate = new Date(decodedToken.exp * 1000);
// //       const currentDate = new Date();
// //       if (tokenExpirationDate > currentDate) {
// //         return true;
// //       }
// //     } catch (error) {
// //       console.error('Error decoding access token:', error);
// //     }
// //   }

// //   return false;
// // }

// //   register(username: string, email: string, password: string): Observable<any> {
// //     const registrationData = {
// //       username: username,
// //       email: email,
// //       password: password
// //     };

// //     return this.http.post(`${this.apiUrl}app/register/`, registrationData);
// //   }

// //   login(username: string, password: string): Observable<any> {
// //     return this.http.post(this.loginUrl, { username, password });
// //   }

// //   // // // Slogin(username: string, password: string) {
// //   // // //   return this.http.post('/app/token/', {username, password}).toPromise().then((res: any) => {
// //   // // //     this.token = res.access;
// //   // // //     return res;
// //   // // //   });
// //   // // // }

// //   // // // logout(refreshToken: string): Observable<any> {
// //   // // //   return this.http.post(this.logoutUrl, { refresh_token: refreshToken });
// //   // // // }
// //   // // // logout(refreshToken: string): Observable<any> {
// //   // // //   return this.http.post(this.logoutUrl, { refresh_token: refreshToken });
// //   // // // }

// //   // login(username: string, password: string): Observable<any> {
// //   //   return this.http.post(this.loginUrl, { username, password }).pipe(tap((data: any) => {
// //   //     localStorage.setItem('access_token', data.access);
// //   //     localStorage.setItem('refresh_token', data.refresh);
// //   //     console.log('user logged in:', data.username);
  
// //   //     // Save the cart to localStorage
// //   //     // this.cartService.saveCart();
// //   //   }));
// //   // }





// //   logout(refreshToken: string): Observable<any> {
// //     const httpOptions = {
// //       headers: new HttpHeaders({
// //         'Content-Type':  'application/json',
// //         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
// //       })
// //     };
    
// //     return this.http.post(this.logoutUrl, { refresh_token: refreshToken }, httpOptions);
// //   }





// // //   ///////////////////////////////////////////////////////////////////////////
// // //   logout(refreshToken: string): Observable<any> {
// // //     const httpOptions = {
// // //       headers: new HttpHeaders({
// // //         'Content-Type':  'application/json',
// // //         'Authorization': 'Bearer ' + localStorage.getItem('access_token')
// // //       })
// // //     };
// // //     return this.http.post(this.logoutUrl, { refresh_token: refreshToken }, httpOptions);
// // //   }
// // // // }
// // // // ############# new ################
// // //   // getToken(): string | null {
// // //   //   return localStorage.getItem(this.tokenKey);
// // //   // }

// // //   // setToken(token: string): void {
// // //   //   localStorage.setItem(this.tokenKey, token);
// // //   // }

// // //   // removeToken(): void {
// // //   //   localStorage.removeItem(this.tokenKey);
// // //   // }
// // //   /////////////////////////////////////////////////////////////
// //   getToken() {
// //     return this.token;
// //   }
// //   }


// // // import { Injectable } from '@angular/core';

// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class AuthtwoService {

// // //   constructor() { }
// // // }
