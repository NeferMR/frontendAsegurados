/**
 * Interfaz que representa la estructura de un Asegurado en el sistema
 */
export interface Asegurado {
  /** Número de identificación único del asegurado */
  numeroIdentificacion: number;
  /** Primer nombre del asegurado */
  primerNombre: string;
  /** Segundo nombre del asegurado (opcional) */
  segundoNombre?: string;
  /** Primer apellido del asegurado */
  primerApellido: string;
  /** Segundo apellido del asegurado */
  segundoApellido: string;
  /** Número de teléfono del asegurado (10 dígitos) */
  telefono: string;
  /** Correo electrónico del asegurado */
  email: string;
  /** Fecha de nacimiento del asegurado */
  fechaNacimiento: Date;
  /** Valor del seguro en la moneda correspondiente */
  valorSeguro: number;
  /** Observaciones adicionales sobre el asegurado (opcional) */
  observaciones?: string;
} 