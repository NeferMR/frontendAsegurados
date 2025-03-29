export interface Asegurado {
  numeroIdentificacion: number;
  primerNombre: string;
  segundoNombre?: string; 
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  email: string;
  fechaNacimiento: Date;
  valorSeguro: number;
  observaciones?: string;
} 