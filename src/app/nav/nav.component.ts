import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavbarComponent {
  searchTerm: string = '';

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  onSearch(): void {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) return; // Si vide, ne rien faire

    this.olympicService.getOlympics()
      .pipe(
        take(1), // prend une seule valeur
        map(data => data?.find((c: any) => c.country.toLowerCase() === search))
      )
      .subscribe(country => {
        if (country) {
          // ✅ Redirige vers /details/:country
          this.router.navigate(['/details', country.country]);
        } else {
          // 🚫 Pays non trouvé
          alert('Pays non trouvé 😢');
        }
      });
  }
}
