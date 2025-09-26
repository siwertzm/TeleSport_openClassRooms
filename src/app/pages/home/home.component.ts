import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public nbJos$: Observable<number> = of(0);
  public nbCountries$: Observable<number> = of(0);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.nbCountries$ = this.olympics$.pipe(
      map((data) => (data ? data.length : 0))
    );
    this.nbJos$ = this.olympics$.pipe(
      map(data => {
        if (!data) return 0;
        const allYears = data.flatMap((country: any) => 
          country.participations.map((p: any) => p.year)
        );
        return [...new Set(allYears)].length;
      })
    );
  }
}
