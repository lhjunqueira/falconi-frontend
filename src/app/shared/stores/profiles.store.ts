import {
  createAction,
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
  props,
} from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { Profile } from '../../features/modules/users/models/profile.model';
import { ProfilesService } from '../../features/modules/users/service/profiles.service';

export interface ProfilesState {
  profiles: Profile[];
}

const initialState: ProfilesState = {
  profiles: [],
};

export const loadProfiles = createAction('[Profiles] Load');
export const loadProfilesSuccess = createAction(
  '[Profiles] Load Success',
  props<{ profiles: Profile[] }>()
);

export const profilesReducer = createReducer(
  initialState,
  on(loadProfilesSuccess, (state, { profiles }) => ({ ...state, profiles }))
);

export const selectProfilesState =
  createFeatureSelector<ProfilesState>('profiles');
export const selectAllProfiles = createSelector(
  selectProfilesState,
  (state) => state.profiles
);

@Injectable()
export class ProfilesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profilesService: ProfilesService
  ) {}

  loadProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfiles),
      mergeMap(() =>
        this.profilesService
          .getProfiles()
          .pipe(map((profiles) => loadProfilesSuccess({ profiles })))
      )
    )
  );
}

export const profilesFeature = {
  name: 'profiles',
  reducer: profilesReducer,
  effects: [ProfilesEffects],
};
