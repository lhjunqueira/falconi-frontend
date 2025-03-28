import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { Store } from '@ngrx/store';
import { loadProfiles } from './shared/stores/profiles.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [SidenavComponent],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProfiles());
  }
}
