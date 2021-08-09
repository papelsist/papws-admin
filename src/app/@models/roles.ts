export interface RoleDef {
  id?: string;
  app: string;
  label: string;
  descripcion: string;
  orden: number;
}

export const ROLES: { [key: string]: RoleDef } = {
  xpapAdmin: {
    id: 'xpapAdmin',
    app: 'PAPWS Admin',
    label: 'Administrdor',
    descripcion: 'Administrador general de los servicios en la nube',
    orden: -100,
  },
  xpapReadRoles: {
    id: 'xpapAdmin',
    app: 'PAPWS Admin',
    label: 'Consultar roles',
    descripcion: 'Consultar los roles de seguridad asignados a usuarios',
    orden: -101,
  },
  xpapDepositosAdmin: {
    id: 'xpapDepositosAdmin',
    app: 'SX-DEPOSITOS',
    label: 'Admin SX-Depositos',
    descripcion: 'Administrador del sistema de depositos',
    orden: 1,
  },
  xpapDepositosCrear: {
    id: 'xpapDepositosCrear',
    app: 'SX-DEPOSITOS',
    label: 'Crear solicitudes',
    descripcion: 'Crear solicitudes de deposito',
    orden: 2,
  },
  xpapDepositosAutorizar: {
    id: 'xpapDepositosAutorizar',
    app: 'SX-DEPOSITOS',
    label: 'Autorizar solicitudes',
    descripcion: 'Autorizar solicitudes de deposito',
    orden: 3,
  },
  xpapDepositosLeer: {
    id: 'xpapDepositosLeer',
    app: 'SX-DEPOSITOS',
    label: 'Consultar solicitudes',
    descripcion: 'Consultar solicitudes de deposito',
    orden: 4,
  },
  xpapDepositosCredito: {
    id: 'xpapDepositosCredito',
    app: 'SX-DEPOSITOS',
    label: 'Solicitudes de credito',
    descripcion: 'Registrar solicitudes de otras carteras',
    orden: 5,
  },
  xpapCallcenterAdmin: {
    id: 'xpapCallcenterAdmin',
    app: 'SX-CALLCENTER',
    label: 'Administrador del Callcenter',
    descripcion: 'Autorizaciones y procesos críticos en el Callcenter',
    orden: 6,
  },
  xpapCallcenterUser: {
    id: 'xpapCallcenterUser',
    app: 'SX-CALLCENTER',
    label: 'Usuario de Callcenter',
    descripcion: 'Operaciones de venta en el Callcenter',
    orden: 7,
  },
};

export const getRoles = () =>
  Object.keys(ROLES).map((key) => ({ ...ROLES[key], id: key }));
