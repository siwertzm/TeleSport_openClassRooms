import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

type Country = {
  id: number;
  country: string;
  participations: { id: number; year: number; city: string; medalsCount: number; athleteCount: number; }[];
};

type PieDatum = { name: string; value: number };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // les de données
  public olympics$: Observable<Country[] | null> = of(null);
  public nbJos$: Observable<number> = of(0);
  public nbCountries$: Observable<number> = of(0);
  public chartData$!: Observable<PieDatum[]>;

  // Options pour le graph
  public view: [number, number] = [1000, 600];
  public gradient = false;
  public showLegend = false;
  public showLabels = true;
  public isDoughnut = false;
  public colorSchemeName: string = 'cool';

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Récupère les donnée
    this.olympics$ = this.olympicService.getOlympics();

    // Affichage pays et des Jos
    this.nbCountries$ = this.olympics$.pipe(
      map((data) => (Array.isArray(data) ? data.length : 0))
    );

    this.nbJos$ = this.olympics$.pipe(
      map((data) => {
        if (!Array.isArray(data)) return 0;
        const years = data.flatMap((c) => c.participations.map((p) => p.year));
        return new Set(years).size;
      })
    );

    // données graph
    this.chartData$ = this.olympics$.pipe(
      map((data) =>
        Array.isArray(data)
          ? data.map((c) => ({
              name: c.country,
              value: c.participations.reduce((sum, p) => sum + p.medalsCount, 0),
            }))
          : []
      )
    );
  }
  onActivate(e: any) { console.log('Activate', e); }
  onDeactivate(e: any) { console.log('Deactivate', e); }

  onSelect(e: any) { 
    console.log('Item clicked', e);
    const countryName = e.name;
    this.router.navigate(['/details', countryName])
  }
}
