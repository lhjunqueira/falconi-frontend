import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAllProfiles } from '../stores/profiles.store';
import { Profile } from '../../features/modules/users/models/profile.model';

@Pipe({ name: 'profile', pure: false, standalone: true })
export class ProfilePipe implements PipeTransform {
  private profiles$: Observable<Profile[]>;

  constructor(private store: Store) {
    this.profiles$ = this.store.select(selectAllProfiles);
  }

  transform(profileId: string | null): Observable<string> {
    return this.profiles$.pipe(
      map((profiles) => {
        if (!profileId || !profiles.length) return 'Unknown Profile';

        return (
          profiles.find((p) => p.id === profileId)?.name || 'Unknown Profile'
        );
      })
    );
  }
}
