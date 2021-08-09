import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter as xfilter,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { CatalogosService } from '@papx/data-access';
import { Empleado } from '@papx/models';

@Component({
  selector: 'papx-empleado-selector',
  templateUrl: './empleado-selector.component.html',
  styleUrls: ['./empleado-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoSelectorComponent implements OnInit {
  filter$ = new BehaviorSubject('');
  empleados$;

  constructor(
    private modalCtrl: ModalController,
    private service: CatalogosService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.empleados$ = this.filter$.pipe(
      map((term) => term.toUpperCase()),
      debounceTime(100),
      distinctUntilChanged(),
      xfilter((term) => term.length > 2),
      switchMap((term) => this.lookUp(term)),
      catchError((err) => this.handleError(err))
    );
  }

  lookUp(value: string) {
    return this.service.empleados$.pipe(
      map((rows) =>
        rows.filter((item) => {
          let criteria = `${item.nombre} ${item.puesto} ${item.sucursal}`;
          criteria = criteria.toLowerCase();
          return criteria.includes(value.toLowerCase());
        })
      )
    );
  }

  close() {
    this.modalCtrl.dismiss();
  }

  select(c: Empleado) {
    this.modalCtrl.dismiss(c);
  }

  onSearch({ target: { value } }: any) {
    this.filter$.next(value);
  }

  handleError(err: any) {
    console.error('Error buscando clientes, ', err);
    return of([]);
  }
}
