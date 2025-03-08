import { Persona } from './persona';

export interface User {
  id?: number;
  id_persona?: number;
  email: string;
  usuario_nom: string;
  foto_perfil?: string;
  persona?: Persona;
  email_verified_at?: string;
  password: string;
  rol: string;
  is_active?: any;
  is_Inactive?: boolean;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
}
