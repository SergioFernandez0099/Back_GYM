export class ErrorAutenticacion extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
    this.fecha = new Date();
  }
}

export class ErrorAccesoDenegado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
    this.fecha = new Date();
  }
}

export class ErrorSolicitud extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
    this.fecha = new Date();
  }
}

export class ErrorIncorrectParam extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
    this.fecha = new Date();
  }
}

export class ErrorRegisterNotFound extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = this.constructor.name;
    this.fecha = new Date();
  }
}
