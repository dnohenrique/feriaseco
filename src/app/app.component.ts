import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  url: string;
  showNavbar: boolean;
  showFooter: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return child.snapshot.data.title;
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data + ' - Férias & Co');
      }
    });

  }

  ngOnInit() {
    this.showNavbar = true;
    this.showFooter = true;
    this.url = location.href;

    if (this.url.includes('login')) {
      this.showNavbar = false;
      this.showFooter = false;
    }
  }
}
