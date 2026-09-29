import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  rememberMe = false;
  showPassword = false;

  emailInvalid = false;
  passwordInvalid = false;

  loginError = '';

  constructor(
    private router: Router
  ) {}

  // =========================================================
  // LOGIN
  // =========================================================

  login(): void {

    this.emailInvalid = false;
    this.passwordInvalid = false;
    this.loginError = '';

    // =======================================================
    // EMAIL VALIDATION
    // =======================================================

    const email = this.email.trim().toLowerCase();

    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!email || !gmailRegex.test(email)) {

      this.emailInvalid = true;

      return;
    }

    // =======================================================
    // PASSWORD VALIDATION
    // =======================================================

    if (!this.password || this.password.length < 6) {

      this.passwordInvalid = true;

      return;
    }

    // =======================================================
    // FRONTEND ONLY LOGIN
    // =======================================================

    /*
     * No backend/API call.
     *
     * Any valid Gmail address and password
     * with at least 6 characters will be accepted.
     *
     * Authentication can be connected later.
     */

    if (this.rememberMe) {

      localStorage.setItem(
        'rmLoggedIn',
        'true'
      );

      localStorage.setItem(
        'rmEmail',
        email
      );

    } else {

      sessionStorage.setItem(
        'rmLoggedIn',
        'true'
      );

    }

    // =======================================================
    // NAVIGATE TO MEETING LIST
    // =======================================================

    this.router.navigate(['/meetings']);

  }

  // =========================================================
  // SHOW / HIDE PASSWORD
  // =========================================================

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }

  // =========================================================
  // CLEAR EMAIL ERROR
  // =========================================================

  clearEmailError(): void {

    this.emailInvalid = false;
    this.loginError = '';

  }

  // =========================================================
  // CLEAR PASSWORD ERROR
  // =========================================================

  clearPasswordError(): void {

    this.passwordInvalid = false;
    this.loginError = '';

  }

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  forgotPassword(): void {

    this.loginError =
      'Please contact your administrator to reset your password.';

  }

  // =========================================================
  // MICROSOFT LOGIN
  // =========================================================

  ssoLogin(): void {

    // Frontend-only SSO simulation for now
    sessionStorage.setItem('rmLoggedIn', 'true');

    this.router.navigate(['/meetings']);

  }

}
