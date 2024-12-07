import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class MenuComponent {
  constructor(private router: Router, private http: HttpClient) {}
  
  onLogout(): void {
    this.http.post('http://localhost:3000/logout', {}, {
        headers: { Authorization: localStorage.getItem('token') || '' }
    }).subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    });
}


}
