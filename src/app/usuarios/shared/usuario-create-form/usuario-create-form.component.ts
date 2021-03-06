import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '@papx/models';

@Component({
  selector: 'papx-usuario-create-form',
  templateUrl: 'usuario-create-form.component.html',
  styleUrls: ['usuario-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioCreateFormComponent implements OnInit, OnChanges {
  @Input() usuario: Partial<User>;
  @Output() save = new EventEmitter<any>();
  errorColor = 'warning';
  showPassword = false;
  form = new FormGroup({
    displayName: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(70),
      ],
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
    }),
    nombre: new FormControl(null, [Validators.required, Validators.min(10)]),
    numeroDeEmpleado: new FormControl(null, [Validators.required]),
    puesto: new FormControl(null, [Validators.required, Validators.min(10)]),
    sucursal: new FormControl(null, [Validators.required]),
  });

  controls = {
    displayName: this.form.get('displayName'),
    email: this.form.get('email'),
    nombre: this.form.get('nombre'),
    numeroDeEmpleado: this.form.get('numeroDeEmpleado'),
    puesto: this.form.get('puesto'),
    sucursal: this.form.get('sucursal'),
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.usuario.isFirstChange()) {
      this.form.patchValue(changes.usuario.currentValue);
      this.cd.markForCheck();
    }
  }

  isValid(prop: string) {
    return this.controls[prop].valid;
  }

  validColor(prop: string) {
    return this.isValid(prop) ? 'primary' : '';
  }

  hasError(prop: string, code: string) {
    return this.controls[prop].hasError(code);
  }

  hasEmailError() {
    return this.hasError('email', 'email');
  }
  displayNameError() {
    const ctrl = this.controls.displayName;
    if (ctrl.pristine) {
      return null;
    }
    if (ctrl.hasError('required')) {
      return 'Debe registrar el nombre de usuario desado';
    } else if (ctrl.hasError('minlength')) {
      return 'Longitud m??nima 8';
    } else if (ctrl.hasError('maxlength')) {
      return 'Longitud m??xina de 70';
    } else {
      return null;
    }
  }

  submit() {
    if (this.form.valid) {
      this.form.markAsPristine();
      this.save.emit(this.form.value);
    }
  }
}
