import { RouterModule, Routes } from '@angular/router';
import { ListUsersContainerComponent } from './features/modules/users/components/list-users-container/list-users-container.component';
import { HomeContainerComponent } from './features/modules/home/components/home-container/home-container.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeContainerComponent },
  { path: 'users', component: ListUsersContainerComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
