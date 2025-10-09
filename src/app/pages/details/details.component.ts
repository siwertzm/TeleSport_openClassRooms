import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule, LineChartModule } from '@swimlane/ngx-charts';

type Country = {
  id: number;
  country: string;
  participations: { id: number; year: number; city: string; medalsCount: number; athleteCount: number; }[];
};

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, LineChartModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  country$!: Observable<Country | null>;
  nbJos$!: Observable<number>;
  nbMedals$!: Observable<number>;
  nbAthletes$!: Observable<number>;
  lineData$!: Observable<any[]>;

  public view: [number, number] = [1000, 600];

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //récup du pays
    this.country$ = this.route.paramMap.pipe(
      map(params => params.get('country')),
      switchMap(countryName =>
        this.olympicService.getOlympics().pipe(
          map((data: Country[] | null) => {
            if (!data || !countryName) return null;
            return data.find(c => c.country === countryName) ?? null;
          })
        )
      ),
      shareReplay(1) 
    );

    //données du graph
    this.lineData$ = this.country$.pipe(
      map(c =>
        c
          ? [{
              name: c.country,
              series: c.participations.map(p => ({
                name: String(p.year),
                value: p.medalsCount
              }))
            }]
          : []
      )
    );

    //calcul des jo
    this.nbJos$ = this.country$.pipe(
      map(c => c ? c.participations.length : 0)
    );

    //calcul des médailles
    this.nbMedals$ = this.country$.pipe(
      map(c => c ? c.participations.reduce((sum, p) => sum + p.medalsCount, 0) : 0)
    );

    //calcul des athlètes
    this.nbAthletes$ = this.country$.pipe(
      map(c => c ? c.participations.reduce((sum, p) => sum + p.athleteCount, 0) : 0)
    );
  }

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = true;
  colorSchemeName: string = 'cool';

  onSelect(e: any) { console.log('Item clicked', e); }
  onActivate(e: any) { console.log('Activate', e); }
  onDeactivate(e: any) { console.log('Deactivate', e); }

  gohome() {
    this.router.navigate(['/']);
  }

  
}
