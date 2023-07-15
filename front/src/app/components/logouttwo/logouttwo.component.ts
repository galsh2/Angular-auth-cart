// logout.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/authtwo.service'; // Please adjust the path according to your folder structure

@Component({
  selector: 'app-logout',
  template: '<button (click)="logout()">Log out</button>'
})
export class LogouttwoComponent {

  constructor(private authService: AuthService) { }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    // console.log('1');
    
    if (refreshToken) {
      // console.log('2');
      this.authService.logout(refreshToken).subscribe(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log('user logged out');
        
      });
    } else {
      console.error('Refresh token not found');
    }
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-logouttwo',
//   templateUrl: './logouttwo.component.html',
//   styleUrls: ['./logouttwo.component.css']
// })
// export class LogouttwoComponent {

// }
