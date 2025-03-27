import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { UsersService } from './features/modules/users/service/users.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { profilesFeature } from './shared/stores/profiles.store';
import { ProfilePipe } from './shared/pipes/profile.pipe';
import { ProfilesService } from './features/modules/users/service/profiles.service';

const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forFeature(profilesFeature.name, profilesFeature.reducer),
    EffectsModule.forFeature(profilesFeature.effects),
  ],
  providers: [...INTERCEPTORS, UsersService, ProfilesService, ProfilePipe],
})
export class AppModule {}
