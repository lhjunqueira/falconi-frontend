import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { ProfilesService } from '../../../features/modules/users/service/profiles.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllProfiles } from '../../stores/profiles.store';

@Component({
  selector: 'profiles-select',
  templateUrl: './profiles-select.component.html',
  styleUrls: ['./profiles-select.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class ProfilesSelectComponent
  implements ControlValueAccessor, Validator, OnDestroy, AfterViewInit, OnInit
{
  constructor(
    @Self() @Optional() private ngControl: NgControl,
    private readonly profilesService: ProfilesService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly store: Store
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  @Input({ required: true }) formControl: FormControl<string | null> | null =
    null;
  destroy$ = new Subject<void>();
  profiles$ = this.store.select(selectAllProfiles);

  private _onTouch!: () => void;
  private _onChange: (value: string) => void = () => {};

  ngOnInit(): void {
    this.formControl = this.formControl ?? new FormControl<string | null>(null);
  }

  writeValue(value: string): void {
    if (value !== this.formControl?.value) this.formControl?.setValue(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  validate(): ValidationErrors | null {
    return this.formControl?.valid ? null : { required: true };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    this.formControl = this.ngControl?.control as FormControl<string>;
  }
}
