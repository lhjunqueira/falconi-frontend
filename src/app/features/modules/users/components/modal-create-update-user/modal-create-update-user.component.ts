import { MediaMatcher } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { CreateUpdateUserDto } from '../../dto/create-update-user.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfilesSelectComponent } from '../../../../../shared/components/profiles-select/profiles-select.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-modal-create-update-user',
  templateUrl: './modal-create-update-user.component.html',
  styleUrls: ['./modal-create-update-user.component.scss'],
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
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
})
export class ModalCreateUpdateUserComponent {
  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public dataDialog: ModalCreateUpdateUserInterface,

    @Optional()
    public dialogRef: MatDialogRef<ModalCreateUpdateUserComponent>,

    @Optional()
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public dataBottomSheet: ModalCreateUpdateUserInterface,

    @Optional()
    public bottomSheetRef: MatBottomSheetRef<ModalCreateUpdateUserComponent>,

    private readonly media: MediaMatcher
  ) {
    this.interface = dataDialog ?? dataBottomSheet;

    this.formGroup = this.createForm();
  }

  interface: ModalCreateUpdateUserInterface;

  formGroup: FormGroup<CreateUdpdateUserFormInterfacce>;

  createForm() {
    const createdFormGroup = new FormGroup<CreateUdpdateUserFormInterfacce>({
      firstName: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      }),
      lastName: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      }),
      email: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      }),
      profileId: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      isActive: new FormControl<boolean | null>(true),
    });

    if (this.interface.user) {
      createdFormGroup.patchValue({
        firstName: this.interface.user.firstName,
        lastName: this.interface.user.lastName,
        email: this.interface.user.email,
        profileId: this.interface.user.profileId,
        isActive: this.interface.user.isActive,
      });
    }

    return createdFormGroup;
  }

  cancel(): void {
    this.closeDialog();
  }

  save(): void {
    if (this.formGroup.valid) {
      const dto: CreateUpdateUserDto = {
        firstName: this.formGroup.value.firstName!,
        lastName: this.formGroup.value.lastName!,
        email: this.formGroup.value.email!,
        profileId: this.formGroup.value.profileId!,
        isActive: this.formGroup.value.isActive!,
      };

      this.closeDialog({ id: this.interface.user?.id, dto });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private closeDialog(dto?: ModalCreateUpdateUserResponse): void {
    this.dialogRef?.close(dto);
    this.bottomSheetRef?.dismiss(dto);
  }
}

interface CreateUdpdateUserFormInterfacce {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  profileId: FormControl<string | null>;
  isActive: FormControl<boolean | null>;
}

export interface ModalCreateUpdateUserInterface {
  user?: User;
}

export interface ModalCreateUpdateUserResponse {
  id?: string;
  dto: CreateUpdateUserDto;
}
