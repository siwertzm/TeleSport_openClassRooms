import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, NavigationError } from '@angular/router';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Charge les données
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();

    // Capture les erreurs de navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        console.error('Navigation Error :', event.error);
        this.router.navigate(['/not-found']);
      }
    });
  }
}
