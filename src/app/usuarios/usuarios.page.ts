import { Component, OnInit } from '@angular/core';
import { UsuariosFacade } from './usuarios.facade';

@Component({
  selector: 'papx-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios$ = this.facade.usuarios$;
  usuariosPorSucursal$ = this.facade.usuariosPorSucursal$;

  constructor(private facade: UsuariosFacade) {}

  ngOnInit() {}

  search({ detail: { value } }: any) {
    this.facade.setSearchTerm(value);
  }
}
