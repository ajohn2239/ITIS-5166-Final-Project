import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Make the component standalone
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  onLogin(): void {
    this.http.post('http://localhost:3000/login', 
      { username: this.username, password: this.password },
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }

  onLogout(): void {
    this.http.post('http://localhost:3000/logout', {}, {
        headers: { Authorization: localStorage.getItem('token') || '' }
    }).subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    });
}

}
