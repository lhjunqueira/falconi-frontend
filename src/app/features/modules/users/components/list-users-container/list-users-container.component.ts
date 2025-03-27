import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfilesSelectComponent } from '../../../../../shared/components/profiles-select/profiles-select.component';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsersStore } from './list-users-container.store';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  Observable,
  startWith,
} from 'rxjs';
import {
  ModalCreateUpdateUserComponent,
  ModalCreateUpdateUserInterface,
  ModalCreateUpdateUserResponse,
} from '../modal-create-update-user/modal-create-update-user.component';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ProfilePipe } from '../../../../../shared/pipes/profile.pipe';

@Component({
  selector: 'app-list-users-container',
  templateUrl: './list-users-container.component.html',
  styleUrls: ['./list-users-container.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    ProfilesSelectComponent,
    MatChipsModule,
    MatIconModule,
    AsyncPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule,
    ProfilePipe,
    MatCardModule,
  ],
  providers: [UsersStore],
})
export class ListUsersContainerComponent {
  userStore = inject(UsersStore);

  constructor(
    private readonly mediaMatcher: MediaMatcher,
    private readonly matBottomSheet: MatBottomSheet,
    private readonly matDialog: MatDialog
  ) {
    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((formValues) => {
        this.userStore.setFilter({
          search: formValues.search ?? undefined,
          profileId: formValues.profileId ?? undefined,
        });
        this.userStore.loadUsers$();
      });
  }

  users$ = this.userStore.users$;
  totalUsers$ = this.userStore.total$;

  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'status',
    'profile',
    'actions',
  ];

  form = new FormGroup<UserSeachFormInterface>({
    search: new FormControl(''),
    profileId: new FormControl(''),
  });

  toggleUserStatus(user: User, isActive: boolean) {
    this.userStore.toggleUserStatus$({ userId: user.id, isActive: isActive });
  }

  createUser() {
    this.openModalToCreateAndEditUser();
  }

  editUser(user: User) {
    this.openModalToCreateAndEditUser(user);
  }

  deleteUser(user: User) {
    this.userStore.deleteUser$(user.id);
  }

  onPageChange(event: PageEvent) {
    this.userStore.setPage$(event.pageIndex);
  }

  openModalToCreateAndEditUser(user?: User) {
    let afterDismissed: Observable<ModalCreateUpdateUserResponse | undefined>;

    const data: ModalCreateUpdateUserInterface = { user };

    if (this.mediaMatcher.matchMedia('(max-width: 600px)').matches) {
      afterDismissed = this.matBottomSheet
        .open(ModalCreateUpdateUserComponent, { data })
        ?.afterDismissed();
    } else {
      afterDismissed = this.matDialog
        .open(ModalCreateUpdateUserComponent, { data })
        ?.afterClosed();
    }

    afterDismissed.pipe(first()).subscribe((result) => {
      if (result) {
        if (result.id)
          this.userStore.updateUser$({ id: result.id, dto: result.dto });
        else this.userStore.createUser$(result.dto);
      }
    });
  }
}

interface UserSeachFormInterface {
  search: FormControl<string | null>;
  profileId: FormControl<string | null>;
}
