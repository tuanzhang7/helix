import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', role: '' };

  constructor(private userService: UserService,
              private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedPayload = this.decodePayloadFromToken(token);
      this.setCurrentUser(decodedPayload);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedPayload = this.decodePayloadFromToken(res.token);
        this.setCurrentUser(decodedPayload);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.router.navigate(['/']);
  }

  decodePayloadFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedPayload) {
    if (decodedPayload) {
      this.loggedIn = true;
      this.currentUser._id = decodedPayload._id;
      this.currentUser.username = decodedPayload.username;
      this.currentUser.role = decodedPayload.role;
      decodedPayload.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
      delete decodedPayload.role;
     }
  }

}
