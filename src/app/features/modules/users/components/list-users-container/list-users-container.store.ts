import { Injectable, signal } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../service/users.service';
import { FilterUserPaginatedDto } from '../../dto/filter-user-paginated.dto';
import { CreateUpdateUserDto } from '../../dto/create-update-user.dto';
import { ListPaginated } from '../../../../../shared/models/list-paginated.model';

interface UsersStoreState {
  users: User[];
  filter: FilterUserPaginatedDto;
  total: number;
}

const initialState: UsersStoreState = {
  users: [],
  filter: { search: '', profileId: undefined },
  total: 0,
};

@Injectable()
export class UsersStore extends ComponentStore<UsersStoreState> {
  constructor(private usersService: UsersService) {
    super(initialState);
  }

  users$ = this.select((state) => state.users);
  filter$ = this.select((state) => state.filter);
  total$ = this.select((state) => state.total);

  readonly setUsers = this.updater(
    (state: UsersStoreState, users: ListPaginated<User>) => ({
      ...state,
      users: users.items,
      total: users.total,
    })
  );
  readonly setFilter = this.updater(
    (state: UsersStoreState, filter: FilterUserPaginatedDto) => ({
      ...state,
      filter,
    })
  );
  readonly setUpdatedUser = this.updater(
    (state: UsersStoreState, user: User) => ({
      ...state,
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })
  );

  readonly loadUsers$ = this.effect((empty$: Observable<void>) =>
    empty$.pipe(
      withLatestFrom(this.filter$),
      switchMap(([_, filter]) =>
        this.usersService
          .getUsers(filter)
          .pipe(tap((users) => this.setUsers(users)))
      )
    )
  );

  readonly createUser$ = this.effect((user$: Observable<CreateUpdateUserDto>) =>
    user$.pipe(
      withLatestFrom(this.filter$),
      switchMap(([user, filter]) =>
        this.usersService.createUser(user).pipe(
          tap((newUser) => {
            if (newUser) {
              this.setFilter({ ...filter, page: 0 });
              this.loadUsers$();
            }
          })
        )
      )
    )
  );

  readonly updateUser$ = this.effect(
    (user$: Observable<{ id: string; dto: CreateUpdateUserDto }>) =>
      user$.pipe(
        switchMap(({ id, dto }) =>
          this.usersService
            .updateUser(id, dto)
            .pipe(tap((updatedUser) => this.setUpdatedUser(updatedUser)))
        )
      )
  );

  readonly toggleUserStatus$ = this.effect(
    (userId$: Observable<{ userId: string; isActive: boolean }>) =>
      userId$.pipe(
        switchMap(({ userId, isActive }) => {
          return this.usersService
            .toggleUserStatus(userId, isActive)
            .pipe(tap((updatedUser) => this.setUpdatedUser(updatedUser)));
        })
      )
  );

  readonly deleteUser$ = this.effect((userId$: Observable<string>) =>
    userId$.pipe(
      switchMap((userId) =>
        this.usersService.deleteUser(userId).pipe(
          tap((user) => {
            if (user) this.loadUsers$();
          })
        )
      )
    )
  );

  readonly setPage$ = this.effect((page$: Observable<number>) =>
    page$.pipe(
      withLatestFrom(this.filter$),
      tap(([page, filter]) => {
        this.setFilter({ ...filter, page });
        this.loadUsers$();
      })
    )
  );
}
