import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '@app/core/classes';
import { User } from '@app/core/models';
import { ToasterService, UsersService } from '@app/core/services';
import { TOASTER_TYPES, USER_TYPE } from '@app/shared/constants';
import { FormInvalidClassDirective } from '@app/shared/directives';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInvalidClassDirective],
})
export class EditUserModalComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() showModal!: boolean;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() willDismiss = new EventEmitter<void>();
  public isNewUser: boolean = false;
  public userForm: UntypedFormGroup;
  public userTypeList = Object.values(USER_TYPE);
  private usersService = inject(UsersService);
  private toasterService = inject(ToasterService);

  constructor() {
    this.userForm = new UntypedFormGroup(
      {
        username: new UntypedFormControl('', Validators.required),
        firstName: new UntypedFormControl('', Validators.required),
        lastName: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('', [
          Validators.required,
          Validators.email,
        ]),
        userType: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.minOneNumber,
          CustomValidators.minOneLetter,
        ]),
        confirmPassword: new UntypedFormControl('', Validators.required),
      },
      {
        validators: CustomValidators.confirmPassword,
      }
    );
  }

  ngOnInit() {
    if (!this.user) {
      this.isNewUser = true;
      this.user = new User({
        lastName: 'sdf',
        firstName: 'asdf',
        email: 'af@afd.adf',
        password: '1111111q',
        userType: 'admin',
      });
    }
    this.initForm();
    // for (let index = 1; index < 30; index++) {
    //   const user = new User({
    //     username: index.toString(),
    //     lastName: 'sdf',
    //     firstName: 'asdf',
    //     email: 'af@afd.adf',
    //     password: '1111111q',
    //     userType: 'admin',
    //   });
    //   this.usersService.add(user).subscribe();
    // }
  }

  private initForm() {
    this.userForm.patchValue({
      ...this.user,
      confirmPassword: this.user?.password,
    });
  }

  public closeModal() {
    this.showModalChange.emit(false);
    this.willDismiss.emit();
  }

  public createUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const newUser = new User(this.userForm.value);
    this.usersService.add(newUser).subscribe(
      () => {
        this.toasterService.showToaster(
          TOASTER_TYPES.Success,
          'User was successfully added'
        );
        this.closeModal();
      },
      (error) => {
        if (error?.error === 'unique') {
          this.userForm.get('username')?.setErrors({ unique: true });
          this.userForm.get('username')?.markAsTouched();
        }
      }
    );
  }

  public saveChanges() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const newUser = new User({ uuid: this.user?.uuid, ...this.userForm.value });
    this.usersService.update(newUser).subscribe(
      () => {
        this.toasterService.showToaster(
          TOASTER_TYPES.Success,
          'User was successfully updated'
        );
        this.closeModal();
      },
      (error) => {
        if (error?.error === 'unique') {
          this.userForm.get('username')?.setErrors({ unique: true });
          this.userForm.get('username')?.markAsTouched();
        }
      }
    );
  }

  public deleteUser() {
    this.usersService.delete(this.user?.uuid as string).subscribe(() => {
      this.toasterService.showToaster(
        TOASTER_TYPES.Success,
        'User was successfully added'
      );
      this.closeModal();
    });
  }
}
