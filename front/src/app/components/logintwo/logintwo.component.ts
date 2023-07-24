// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authtwo.service';
// import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './logintwo.component.html',
  styleUrls: ['./logintwo.component.css']
})
export class LogintwoComponent {
  username: string = '';
  // username = string;
  password: string = '';

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('username', data.username);
      console.log('user logged in:' , data.username);
    });
  }
  
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-logintwo',
//   templateUrl: './logintwo.component.html',
//   styleUrls: ['./logintwo.component.css']
// })
// export class LogintwoComponent {

// }
